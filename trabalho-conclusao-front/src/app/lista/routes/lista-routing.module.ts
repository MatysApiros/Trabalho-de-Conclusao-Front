import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from '../lista.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListaComponent,
    children: [
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaRoutingModule { }
