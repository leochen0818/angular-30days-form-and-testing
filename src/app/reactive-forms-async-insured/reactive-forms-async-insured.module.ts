import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsAsyncInsuredRoutingModule } from './reactive-forms-async-insured-routing.module';
import { ReactiveFormsAsyncInsuredComponent } from './reactive-forms-async-insured.component';
import { AddressInfoModule } from './address-info/address-info.module';

@NgModule({
  declarations: [
    ReactiveFormsAsyncInsuredComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsAsyncInsuredRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AddressInfoModule
  ]
})
export class ReactiveFormsAsyncInsuredModule { }
