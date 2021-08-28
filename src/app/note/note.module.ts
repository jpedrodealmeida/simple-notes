import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteListComponent } from './components/note-list/note-list.component';
import { MainComponent } from './components/main/main.component';



@NgModule({
  declarations: [
    NoteListComponent,
    MainComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NoteModule { }
