import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/interfaces/note.interface';
import { NoteService } from 'src/app/services/note.service';
import { DialogData } from '../../modal/modal.component';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.scss']
})
export class ModalDetailsComponent implements OnInit {

  public note!: Note

  constructor(
    public dialogRef: MatDialogRef<ModalDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number, isShared: boolean},
    private noteService: NoteService
    ) { }

  ngOnInit(): void {
    this.getNote()
  }
  private getNote(): void{
    if(!this.data.isShared)
      this.note = this.noteService.getNoteById(this.data.id)
    else
      this.note = this.noteService.getNoteSharedById(this.data.id)
  }
  public closeModal() {
    this.dialogRef.close(null);
  }

}
