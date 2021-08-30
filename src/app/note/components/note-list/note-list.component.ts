import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/interfaces/note.interface';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  public taskList: Note[] = 
  [
    {
      id: 0,
      title: 'Clean bed room',
      category: 'Clean',
      content: 'Thats my first tast to test here',
      date: new Date(),
      userId: 0
    },
    {
      id: 1,
      title: 'Sing with my girl',
      category: 'Happy moment',
      content: 'The only time of happiness about my life',
      date: new Date(),
      userId: 0
    },
    {
      id: 2,
      title: 'Study to english test',
      category: 'Study',
      content: 'My last test of year in my hight school',
      date: new Date(),
      userId: 0
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
