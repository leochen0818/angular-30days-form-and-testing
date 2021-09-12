import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsLoginComponent } from './reactive-forms-login.component';

const routes: Routes = [
  {
    path: '',
    component: ReactiveFormsLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveFormsLoginRoutingModule { }
