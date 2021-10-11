import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReactiveFormsDateRangeRoutingModule } from './reactive-forms-date-range-routing.module';
import { ReactiveFormsDateRangeComponent } from './reactive-forms-date-range.component';
import { ErrorMessagePipe } from './error-message.pipe';


@NgModule({
  declarations: [
    ReactiveFormsDateRangeComponent,
    ErrorMessagePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsDateRangeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReactiveFormsDateRangeModule { }
