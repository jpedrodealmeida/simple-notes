import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';


import { NoteListComponent } from './components/note-list/note-list.component';
import { MainComponent } from './components/main/main.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    NoteListComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class NoteModule { }
