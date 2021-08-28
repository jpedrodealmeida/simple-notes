import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import { MatCardModule } from '@angular/material/card';
import { NoteListComponent } from './components/note-list/note-list.component';
import { MainComponent } from './components/main/main.component';
import { MatButtonModule } from '@angular/material/button';
import { NoteCardComponent } from './components/note-card/note-card.component';




@NgModule({
  declarations: [
    NoteListComponent,
    MainComponent,
    NoteCardComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
  ]
})
export class NoteModule { }
