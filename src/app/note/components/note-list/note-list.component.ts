import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/interfaces/note.interface';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import { ModalComponent } from '../modal/modal.component';

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
    private toastr: ToastrService
   
  ) { }

  ngOnInit(): void {
    this.getNotes()
  }
  private getNotes(){
    let user = this.authService.getUserInformations()
    if(user)
      this.taskList = this.noteService.getNoteByUserId(user.id)
  }
  public deleteNote(value: number){
    this.openDialog(value)
  }
 
  openDialog(noteId: number): void {
    this.selectedId = noteId
    const dialogRef = this.matDialog.open(ModalComponent, {
      width: '350px',
      height: '150px',
      data: {id: noteId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== null ){
        let user = this.authService.getUserInformations()
        if(user){
          this.noteService.deleteNote(this.selectedId, user.id)
          this.toastr.success('Successfully deleted', 'Removed')
          this.getNotes()
        }
      }
        
    });
  }

}
