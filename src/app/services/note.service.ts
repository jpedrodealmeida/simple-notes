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
  public getNotesByUserId(userId: number){
    let notes = this.getNotes()
    if(notes)
      notes = notes.filter((note: Note) => note.userId == userId)
    return notes
  }
  public getNoteById(userId: number, noteId: number){
    let notes = this.getNotesByUserId(userId)
    let note!: Note
    if(notes)
      note = notes.find((note: Note) => note.id == noteId)
    return note
  }
  public deleteNote(noteId: number){
    let notes = this.getNotes()
    if(notes){
        let newNotes = notes.filter((note: Note) => note.id !== noteId)
        this.postNote(newNotes)
    }
  }

}
