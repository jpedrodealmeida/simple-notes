import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note.service';
import { DialogData } from '../../modal/modal.component';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.scss']
})
export class ModalDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private noteService: NoteService
    ) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close(null);
  }

}
