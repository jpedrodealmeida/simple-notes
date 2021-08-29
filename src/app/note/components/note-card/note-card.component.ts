import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input("title") public title: string = "My title"
  @Input("category") public category: string = "Category"
  @Input("content") public content: string = "My text exemple"
  @Input("date") public dateTime!: Date

  @Output() public delete = new EventEmitter<User>()
  @Output() public edit = new EventEmitter<User>()
  @Output() public share = new EventEmitter<User>()

  public editIcon = faPen;

  constructor(
    private router: Router,
    
  ) { }

  ngOnInit(): void {
  }
  public deleteEmit(){
    
  }

}
