import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReactiveFormsDateRangeRoutingModule } from './reactive-forms-date-range-routing.module';
import { ReactiveFormsDateRangeComponent } from './reactive-forms-date-range.component';
import { DateRangeModule } from './date-range/date-range.module';

@NgModule({
  declarations: [ReactiveFormsDateRangeComponent],
  imports: [
    CommonModule,
    ReactiveFormsDateRangeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DateRangeModule
  ]
})
export class ReactiveFormsDateRangeModule { }
