import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input("noteId") public noteId: number = 0

  @Input("title") public title: string = "My title"
  @Input("category") public category: string = "Category"
  @Input("content") public content: string = "My text exemple"
  @Input("date") public dateTime!: Date

  @Output() public delete = new EventEmitter<number>()
  @Output() public edit = new EventEmitter<number>()
  @Output() public share = new EventEmitter<number>()

  public editIcon = faPen;
  public noteContent: any

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.sanitizerContent(this.content)
    
  }
  private sanitizerContent(content: string){
    if(content){
      this.noteContent = this.sanitizer.bypassSecurityTrustResourceUrl(this.content)
    }
  }
  public deleteEmit(){
    this.delete.emit(this.noteId)
  }
  public editEmit(){
    this.edit.emit(this.noteId)
  }


}
