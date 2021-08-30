import { Injectable } from '@angular/core';
import { NoteStorage } from '../interfaces/note-storage.interface';
import { Note } from '../interfaces/note.interface';
import { User } from '../interfaces/user.interface';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  
  constructor(
    private authService: AuthService,
    private userService: UserService
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
  }
  private updateNote(oldNotes: Note[], newNote: Note): Note[]{
    let index = oldNotes.findIndex(note => note.id == newNote.id)
    oldNotes[index] = newNote
    return oldNotes
  }
  private localStorageRegister(notes: Note[]){
    localStorage.setItem('notes', JSON.stringify(notes))
  }
  private postNote(note: Note): void{
    let notes = this.getNotes()
      if (notes) 
        this.updateNoteObjToRegister(notes, note)
      else
        notes = this.createNoteObjToRegister(note)
    this.localStorageRegister(notes)
  }
  private updateNoteObjToRegister(notesByUser: NoteStorage[], noteToSave: Note): NoteStorage[]{
    let user: User = this.authService.getUserInformations()
    let found = notesByUser.find(userNotes => userNotes.userId == user.id)
    if (found) {
      notesByUser.map((userNote: NoteStorage) => {
        if (userNote.userId == user.id) {
          userNote.notes.push(noteToSave)
        }
      });
    } else {
      let userNote: NoteStorage = {notes: [noteToSave], userId: user.id, shared: null}
      notesByUser.push(userNote)
    }
    return notesByUser
  }
  private createNoteObjToRegister(noteToSave: Note): NoteStorage[]{
    let userInfo = this.authService.getUserInformations()
    let users = this.userService.getUsers()
    let noteList: NoteStorage[] = []
    users?.forEach(user => {
      if(user.id == userInfo.id)
        noteList.push({userId: user.id, notes: [noteToSave], shared: null})
      else
        noteList.push({userId: user.id, notes: [], shared: null})
    })
    return noteList
  }
  public getNotes(): any{
    let notes = localStorage.getItem('notes')
    if(notes)
      return JSON.parse(notes)
    return notes
  }
  public getNotesByUserId(userId: number): Note[]{
    let notesByUser = this.getNotes()
    let noteList!: Note[]
    if(notesByUser){
      notesByUser.forEach((userNote: NoteStorage) => {
        if(userNote.userId == userId){
          noteList = userNote.notes
        }
      });
    }
    return noteList
  }
  public getNoteById(noteId: number){
    let user = this.authService.getUserInformations()
    let note!: Note
    if(user){
      let notes = this.getNotesByUserId(user.id)
      if(notes)
        note = this.findNote(notes, noteId)
    }
    return note  
  }
  private findNote(notes: Note[], noteId: number): Note{
    let note!: Note 
    let found = notes.find((note: Note) => note.id == noteId)
    if(found)
        note = found
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
