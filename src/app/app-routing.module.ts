import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/componente',
    pathMatch: 'prefix'
  },
  {
    path: 'componente',
    component: AppComponent,
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
