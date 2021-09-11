import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateDrivenFormsLoginComponent } from './template-driven-forms-login.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateDrivenFormsLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateDrivenFormsLoginRoutingModule { }
