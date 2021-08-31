import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/interfaces/note.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';
import { DialogData } from '../../modal/modal.component';

@Component({
  selector: 'app-modal-share',
  templateUrl: './modal-share.component.html',
  styleUrls: ['./modal-share.component.scss']
})
export class ModalShareComponent implements OnInit {

  public note!: Note
  public users!: User[]
  public form!: FormGroup

  constructor(
    public dialogRef: MatDialogRef<ModalShareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private noteService: NoteService,
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getUsers()
    this.formInit()
    this.getNote()
    this.errorListen()
  }
  private errorListen(){
    this.noteService.errorEvent.subscribe(hasErr =>{
      if(hasErr)
        this.toastr.info('Sorry, you already did it')
    })
  }
  private formInit(){
    this.form = this.fb.group({
      pepperoni: false,
      extracheese: false,
      mushroom: false
    })
  }
  private getUsers(){
    let users = this.userService.getUsers()
    if(users){
      this.users = users
      this.removeYourIdFromList()
    }
  }
  private removeYourIdFromList(){
    let user: User = this.authService.getUserInformations()
    let users = this.users.filter(userL => userL.id !== user.id)
    this.users = users

  }
  public closeModal() {
    this.dialogRef.close(null);
  }
  public selectUser(userId: number){
    this.noteService.shareNote(this.note, userId)
    this.toastr.success('Yeah, shared with success', 'Success')
    this.closeModal()
  }
  private getNote(): void{
    this.note = this.noteService.getNoteById(this.data.id)
  }

}
