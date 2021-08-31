import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { faSadCry } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/interfaces/note.interface';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalDetailsComponent } from './modal-details/modal-details.component';
import { ModalShareComponent } from './modal-share/modal-share.component';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  public emptyStateIcon = faSadCry
  public selectedId!: number
  public noteList!: Note[]
  public sharedList!: Note[]
  constructor(
    private authService: AuthService,
    private noteService: NoteService,
    public matDialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
   
  ) { }

  ngOnInit(): void {
    this.getNotes()
    this.getSharedNotes()
  }
  private getNotes(){
    let user = this.authService.getUserInformations()
    if(user){
      this.noteList = this.noteService.getNotesByUserId(user.id)

    }
  }
  private getSharedNotes(){
    let user = this.authService.getUserInformations()
    if(user){
      this.sharedList = this.noteService.getNotesSharedByUserId(user.id)

    }
  }
  public deleteNote(value: number){
    this.openDeleteDialog(value)
  }
 
  private openDeleteDialog(noteId: number): void {
    this.selectedId = noteId
    const dialogRef = this.matDialog.open(ModalComponent, {
      width: '350px',
      height: '150px',
      data: {id: noteId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let user = this.authService.getUserInformations()
        if(user){
          this.noteService.deleteNote(this.selectedId)
          this.toastr.success('Successfully deleted', 'Removed')
          this.getNotes()
        }
      } 
    });
  }
  public editNote(value: number){
    this.router.navigate(['../edit'], {relativeTo: this.route, queryParams: {id: value}});
  }
  public showNote(value: number){
    this.openDetailsDialog(value)
  }
  private openDetailsDialog(noteId: number): void {
    this.selectedId = noteId
    const dialogRef = this.matDialog.open(ModalDetailsComponent, {
      width: '850px',
      height: '650px',
      data: {id: noteId}
    });

  }
  public shareNote(value: number){
    this.openSharedDialog(value)
  }
  private openSharedDialog(noteId: number): void {
    this.selectedId = noteId
    const dialogRef = this.matDialog.open(ModalShareComponent, {
      width: '650px',
      height: '250px',
      data: {id: noteId}
    });

  }

}
