import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TemplateDrivenFormsLoginRoutingModule } from './template-driven-forms-login-routing.module';
import { TemplateDrivenFormsLoginComponent } from './template-driven-forms-login.component';

@NgModule({
  declarations: [
    TemplateDrivenFormsLoginComponent
  ],
  imports: [
    CommonModule,
    TemplateDrivenFormsLoginRoutingModule,
    FormsModule
  ]
})
export class TemplateDrivenFormsLoginModule { }
