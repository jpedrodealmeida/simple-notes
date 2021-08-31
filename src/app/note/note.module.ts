import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatBadgeModule} from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';

import { AngularEditorModule } from '@kolkov/angular-editor';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { MatCardModule } from '@angular/material/card';
import { NoteListComponent } from './components/note-list/note-list.component';
import { MainComponent } from './components/main/main.component';
import { MatButtonModule } from '@angular/material/button';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteRoutingModule } from './note-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ModalComponent } from './components/modal/modal.component';
import { SafeHtmlPipe } from '../pipes/safeHtml.pipe';
import { ModalDetailsComponent } from './components/note-list/modal-details/modal-details.component';
import { ModalShareComponent } from './components/note-list/modal-share/modal-share.component';




@NgModule({
  declarations: [
    NoteListComponent,
    MainComponent,
    NoteCardComponent,
    NoteFormComponent,
    ModalComponent,
    SafeHtmlPipe,
    ModalDetailsComponent,
    ModalShareComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    FontAwesomeModule,
    MatBadgeModule,
    NoteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule
    
  ],
  entryComponents: [ModalComponent, ModalDetailsComponent, ModalShareComponent]
})
export class NoteModule { }
