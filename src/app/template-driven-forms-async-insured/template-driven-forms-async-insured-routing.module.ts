import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateDrivenFormsAsyncInsuredComponent } from './template-driven-forms-async-insured.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateDrivenFormsAsyncInsuredComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateDrivenFormsAsyncInsuredRoutingModule { }
