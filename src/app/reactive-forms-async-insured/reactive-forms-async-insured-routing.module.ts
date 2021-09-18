import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsAsyncInsuredComponent } from './reactive-forms-async-insured.component';

const routes: Routes = [
  {
    path: '',
    component: ReactiveFormsAsyncInsuredComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveFormsAsyncInsuredRoutingModule { }
