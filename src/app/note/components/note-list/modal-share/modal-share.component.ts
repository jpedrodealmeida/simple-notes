import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/interfaces/note.interface';
import { NoteService } from 'src/app/services/note.service';
import { DialogData } from '../../modal/modal.component';

@Component({
  selector: 'app-modal-share',
  templateUrl: './modal-share.component.html',
  styleUrls: ['./modal-share.component.scss']
})
export class ModalShareComponent implements OnInit {

  public note!: Note

  constructor(
    public dialogRef: MatDialogRef<ModalShareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private noteService: NoteService
    ) { }

  ngOnInit(): void {
  }
  public closeModal() {
    this.dialogRef.close(null);
  }

}
