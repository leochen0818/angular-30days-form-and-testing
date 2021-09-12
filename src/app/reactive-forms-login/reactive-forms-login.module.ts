import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReactiveFormsLoginRoutingModule } from './reactive-forms-login-routing.module';
import { ReactiveFormsLoginComponent } from './reactive-forms-login.component';

@NgModule({
  declarations: [
    ReactiveFormsLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsLoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReactiveFormsLoginModule { }
