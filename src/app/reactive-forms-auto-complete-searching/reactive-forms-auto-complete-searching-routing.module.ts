import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsAutoCompleteSearchingComponent } from './reactive-forms-auto-complete-searching.component';

const routes: Routes = [
  {
    path: '',
    component: ReactiveFormsAutoCompleteSearchingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveFormsAutoCompleteSearchingRoutingModule { }
