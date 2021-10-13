import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DateRangeComponent } from './date-range.component';
import { ErrorMessagePipe } from './pipe/error-message/error-message.pipe';

@NgModule({
  declarations: [
    DateRangeComponent,
    ErrorMessagePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [DateRangeComponent]
})
export class DateRangeModule { }
