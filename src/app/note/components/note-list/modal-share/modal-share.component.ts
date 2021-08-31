import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/interfaces/note.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';
import { DialogData } from '../../modal/modal.component';

@Component({
  selector: 'app-modal-share',
  templateUrl: './modal-share.component.html',
  styleUrls: ['./modal-share.component.scss']
})
export class ModalShareComponent implements OnInit {

  public note!: Note
  public users!: User[]

  constructor(
    public dialogRef: MatDialogRef<ModalShareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private noteService: NoteService,
    private userService: UserService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getUsers()
  }
  private getUsers(){
    let users = this.userService.getUsers()
    if(users){
      this.users = users
      this.removeYourIdFromList()
    }
  }
  private removeYourIdFromList(){
    let user: User = this.authService.getUserInformations()
    let users = this.users.filter(userL => userL.id !== user.id)
    this.users = users

  }
  public closeModal() {
    this.dialogRef.close(null);
  }

}
