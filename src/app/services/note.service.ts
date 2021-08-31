import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NoteStorage } from '../interfaces/note-storage.interface';
import { Note } from '../interfaces/note.interface';
import { User } from '../interfaces/user.interface';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  public errorEvent = new EventEmitter<boolean>()
  public searchSub = new Subject<string>()
  
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
    let notesByUser: NoteStorage[] = this.getNotes()
    if(user){
      let found = notesByUser.find(userNotes => userNotes.userId == user.id)
      if (found) {
        notesByUser.map((userNote: NoteStorage) => {
          if (userNote.userId == user.id) {
            userNote.notes = this.updateNote(userNote.notes, newNote)
          }
        });
      }
      this.localStorageRegister(notesByUser)
    }
  }
  private updateNote(notes: Note[], newNote: Note): Note[]{
    let index = notes.findIndex(note => note.id == newNote.id)
    notes[index] = newNote
    return notes
  }
  private localStorageRegister(notes: NoteStorage[]){
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
          noteToSave.id = this.noteIdGenerete(userNote.notes)
          userNote.notes.push(noteToSave)
        }
      });
    } else {
      let userNote: NoteStorage = {notes: [noteToSave], userId: user.id, shared: null}
      notesByUser.push(userNote)
    }
    return notesByUser
  }
  private noteIdGenerete(notes: Note[]): number{
    let listId: number[] = []
    notes.forEach(note =>{
        listId.push(note.id)
    })
    let id = Math.max.apply(null, listId)
    return ++id
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
  public getNotesSharedByUserId(userId: number): Note[]{
    let notesByUser = this.getNotes()
    let noteList!: Note[]
    let temp
    if(notesByUser){
      notesByUser.forEach((userNote: NoteStorage) => {
        if(userNote.userId == userId){
          temp = userNote.shared
          if(temp)
            noteList = temp
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
  public deleteNote(noteId: number) {
    let user = this.authService.getUserInformations()
    let notesByUser: NoteStorage[] = this.getNotes()
    let notes: Note[] = this.getNotesByUserId(user.id)
    if (notes) {
      notes = notes.filter((note: Note) => note.id !== noteId)
      let found = notesByUser.find(userNotes => userNotes.userId == user.id)
      if (found) {
        notesByUser.map((userNote: NoteStorage) => {
          if (userNote.userId == user.id) {
            userNote.notes = notes
          }
        });
      }
    }
    this.localStorageRegister(notesByUser)
  }
  public shareNote(note: Note, userIdDestiny: number){
    let user: User = this.authService.getUserInformations()
    let notesByUser: NoteStorage[] = this.getNotes()
    let foundUser = this.verifyUserExist(notesByUser, userIdDestiny)
    if (foundUser) {
      notesByUser.forEach(noteByUser => {
        if (noteByUser.userId == userIdDestiny) {
          if (noteByUser.shared?.length) {
            let found = this.noteReadyExist(noteByUser.shared, note)
            if (found)
              this.errorEvent.emit(true)
            else
              noteByUser.shared.push(note)
          } else {
            noteByUser.shared = []
            noteByUser.shared.push(note)
          }
        }
      })
    } else {
      notesByUser.push({userId: user.id, notes: [], shared: [note]})
    }
    this.localStorageRegister(notesByUser)
  }
  private verifyUserExist(notesByUser: NoteStorage[], userId: number): boolean{
    let found = notesByUser.find(noteByUser => noteByUser.userId == userId)
    if(found) return true
    return false
  }
  private noteReadyExist(notes: Note[], noteShared: Note): Note{
    let noteFound!: Note
    let found = notes.find(note => note.id == noteShared.id)
    if(found)
      noteFound = found
    return noteFound
  }
  private createObjToShare(){

  }

}
