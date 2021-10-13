import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reactive-forms-date-range',
  templateUrl: './reactive-forms-date-range.component.html',
  styleUrls: ['./reactive-forms-date-range.component.scss']
})
export class ReactiveFormsDateRangeComponent implements OnInit {

  formGroup: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const date = new Date();
    this.formGroup = this.formBuilder.group({
      dateRange: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    });
  }

  enable(): void {
    this.formGroup?.enable();
  }

  disable(): void {
    this.formGroup?.disable();
  }

}
