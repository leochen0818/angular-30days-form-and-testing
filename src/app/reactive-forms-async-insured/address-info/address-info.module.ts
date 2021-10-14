import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressInfoComponent } from './address-info.component';

@NgModule({
  declarations: [AddressInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AddressInfoComponent]
})
export class AddressInfoModule { }
