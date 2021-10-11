import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsDateRangeComponent } from './reactive-forms-date-range.component';

const routes: Routes = [
  {
    path: '',
    component: ReactiveFormsDateRangeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveFormsDateRangeRoutingModule { }
