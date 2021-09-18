import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsAsyncInsuredRoutingModule } from './reactive-forms-async-insured-routing.module';
import { ReactiveFormsAsyncInsuredComponent } from './reactive-forms-async-insured.component';


@NgModule({
  declarations: [
    ReactiveFormsAsyncInsuredComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsAsyncInsuredRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReactiveFormsAsyncInsuredModule { }
