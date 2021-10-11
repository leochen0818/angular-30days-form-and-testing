import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { dateRangeValidator } from './date-range-validator.util';

@Component({
  selector: 'app-reactive-forms-date-range',
  templateUrl: './reactive-forms-date-range.component.html',
  styleUrls: ['./reactive-forms-date-range.component.scss']
})
export class ReactiveFormsDateRangeComponent implements OnInit {

  formGroup: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      startDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      endDate: ['', Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]
    }, { validators: dateRangeValidator });
  }

}
