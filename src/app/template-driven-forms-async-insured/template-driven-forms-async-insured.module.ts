import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TemplateDrivenFormsAsyncInsuredRoutingModule } from './template-driven-forms-async-insured-routing.module';
import { TemplateDrivenFormsAsyncInsuredComponent } from './template-driven-forms-async-insured.component';


@NgModule({
  declarations: [
    TemplateDrivenFormsAsyncInsuredComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TemplateDrivenFormsAsyncInsuredRoutingModule
  ]
})
export class TemplateDrivenFormsAsyncInsuredModule { }
