import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/interfaces/note.interface';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  public taskList!: Note[]
  constructor(
    private authService: AuthService,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.getNotes()
  }
  private getNotes(){
    let user = this.authService.getUserInformations()
    if(user)
      this.taskList = this.noteService.getNoteByUserId(user.id)
  }
}
