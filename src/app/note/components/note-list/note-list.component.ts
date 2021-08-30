import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/interfaces/note.interface';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalDetailsComponent } from './modal-details/modal-details.component';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  public selectedId!: number
  public taskList!: Note[]
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
  }
  private getNotes(){
    let user = this.authService.getUserInformations()
    if(user)
      this.taskList = this.noteService.getNotesByUserId(user.id)
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
      width: '950px',
      height: '650px',
      data: {id: noteId}
    });

  }

}
