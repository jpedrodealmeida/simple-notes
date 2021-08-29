import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { MainComponent } from './components/main/main.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteListComponent } from './components/note-list/note-list.component';

const noteRoutes: Routes = [

  {
    path: 'note',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
        component: NoteListComponent,
        canActivateChild: [AuthGuard],
      },
      {
        path: 'create',
        component: NoteFormComponent,
        canActivateChild: [AuthGuard],
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(noteRoutes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
