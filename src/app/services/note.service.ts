import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  
  constructor() { }

  public saveNote(note: Note){
    let notes = this.getNotes()
    if(notes){
      note.id = notes.length
      notes.push(note)
    }
    else
      notes = [note]
    this.postNote(notes)
  }
  private postNote(notes: Note[]){
    localStorage.setItem('notes', JSON.stringify(notes))
  }
  public getNotes(): any{
    let notes = localStorage.getItem('notes')
    if(notes)
      return JSON.parse(notes)
    return notes
  }

}
