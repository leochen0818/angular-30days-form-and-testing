import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BooleanInZhTwPipe } from './pipes/boolean-in-zh-tw.pipe';

import { ReactiveFormsAutoCompleteSearchingRoutingModule } from './reactive-forms-auto-complete-searching-routing.module';
import { ReactiveFormsAutoCompleteSearchingComponent } from './reactive-forms-auto-complete-searching.component';
import { ReactiveFormsAutoCompleteSearchingService } from './reactive-forms-auto-complete-searching.service';
import { GoogleMapLinkPipe } from './pipes/google-map-link.pipe';
import { LocationStringPipe } from './pipes/location-string.pipe';

@NgModule({
  declarations: [
    ReactiveFormsAutoCompleteSearchingComponent,
    BooleanInZhTwPipe,
    GoogleMapLinkPipe,
    LocationStringPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsAutoCompleteSearchingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ReactiveFormsAutoCompleteSearchingService
  ]
})
export class ReactiveFormsAutoCompleteSearchingModule { }
