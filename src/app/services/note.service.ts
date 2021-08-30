import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  
  constructor(
    private authService: AuthService
  ) { }

  public saveNote(note: Note, isEdit?: boolean) {
    if (!isEdit) {
      this.postNote(note)
    }else{
      this.putNote(note)
    }
  }
  private putNote(newNote: Note){
    let user = this.authService.getUserInformations()
    if(user){
      let notes = this.getNotesByUserId(user.id)
      let newNotes: Note[] = this.updateNote(notes, newNote)
      this.localStorageRegister(newNotes)
    }
    //TODO
  }
  private updateNote(oldNotes: Note[], newNote: Note): Note[]{
    let index = oldNotes.findIndex(note => note.id == newNote.id)
    oldNotes[index] = newNote
    return oldNotes
  }
  private localStorageRegister(notes: Note[]){
    localStorage.setItem('notes', JSON.stringify(notes))
  }
  private postNote(note: Note){
    let notes = this.getNotes()
      if (notes) {
        note.id = notes.length
        notes.push(note)
      }
      else
        notes = [note]
      this.localStorageRegister(notes)
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
  public getNoteById(noteId: number){
    let user = this.authService.getUserInformations()
    let note!: Note
    if(user){
      let notes = this.getNotesByUserId(user.id)
      if(notes)
        note = notes.find((note: Note) => note.id == noteId)
    }
    return note
    
  }
  public deleteNote(noteId: number){
    let notes = this.getNotes()
    if(notes){
        let newNotes = notes.filter((note: Note) => note.id !== noteId)
        this.localStorageRegister(newNotes)
    }
  }

}
