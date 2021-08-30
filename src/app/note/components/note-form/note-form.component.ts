import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/interfaces/note.interface';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {

  public titleBox: string = "Create Note"
  public noteToEdit!: Note
  public isEdit: boolean = false
  show = false

editorConfig: AngularEditorConfig = {
  editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Type your note here',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '16px',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: 'v1/image',
  uploadWithCredentials: false,
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize']
  ]
};
  public form!: FormGroup
  
  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.formInit()
    this.editVerify()
  }
  private loadFormValues(note: Note){
    if(note){
      this.form.controls['title'].patchValue(note.title)
      this.form.controls['category'].patchValue(note.category)
      this.form.controls['content'].patchValue(note.content)
    }
  }
  private editVerify(){
    let url = this.router.url.includes('edit')
      if(url){
        this.isEdit = true
        this.titleBox = "Edit Note"
        this.getUrlParams()
        
      }
  }
  private getUrlParams(){
    this.route.queryParams.subscribe(value =>{
      if(value)
        this.getNoteData(value.id)
    })
  }
  private getNoteData(noteId: number){
      this.noteToEdit = this.noteService.getNoteById(noteId)
      this.loadFormValues(this.noteToEdit)
  }
  public showClick(){
    this.show = !this.show
  }

  private formInit(){
    this.form = this.fb.group({
      title: ['', ],
      category: ['', ],
      content: ['', Validators.required]
    })
  }
  private formClear(){
    this.form.controls['title'].patchValue('')
    this.form.controls['category'].patchValue('')
    this.form.controls['content'].patchValue('')
  }
  public save(){
    let note = this.getFormValue()
    this.noteService.saveNote(note, this.isEdit)
    this.toastr.success('Save with success', 'Note')
    this.clean()
    this.router.navigate(['/'])
  }
  private getFormValue(){
    let user = this.getUserInfo()
    let note: Note = {
      id: this.getNoteId(),
      title: this.inputEmptyVerify(this.form.controls['title'].value, 'Title'),
      category: this.inputEmptyVerify(this.form.controls['category'].value, 'Category'),
      content: this.inputEmptyVerify(this.form.controls['content'].value, 'Content'),
      userId: user.id,
      date: new Date()
    }
    return note
  }
  private inputEmptyVerify(value: string, title: string): string{
    if(value)
      return value
    return `Default-${title}`
  }
  private getNoteId(): number{
    if(!this.isEdit)
      return 0
    return this.noteToEdit.id
  }
  private getUserInfo(){
    return this.authService.getUserInformations()
  }
  
  public clean(){
    this.formClear()
  }
}
