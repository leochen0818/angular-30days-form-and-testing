import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { skip } from 'rxjs/operators';

import { dateRangeValidator } from './date-range-validator.util';

export const DATE_RANGE_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateRangeComponent),
  multi: true
};

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  providers: [DATE_RANGE_CONTROL_VALUE_ACCESSOR]
})
export class DateRangeComponent implements OnInit, ControlValueAccessor {

  formGroup: FormGroup | undefined;

  fnFormRegisterOnChange: ((dateString: string) => void) | undefined;
  fnFormRegisterOnTouched: (() => void) | undefined;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      startDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      endDate: ['', Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]
    }, { validators: dateRangeValidator });

    this.formGroup.valueChanges.subscribe(({ startDate, endDate }) => {
      let dateString = startDate;
      if (endDate) {
        dateString += `, ${endDate}`;
      }
      if (this.formGroup?.errors) {
        dateString = '';
      }
      if (this.fnFormRegisterOnChange) {
        this.fnFormRegisterOnChange(dateString);
      }
    });
  }

  writeValue(dateRangeString: string): void {
    const [startDate, endDate] = dateRangeString.split(', ');
    this.formGroup?.patchValue({ startDate, endDate }, {
      emitEvent: false
    });
  }

  registerOnChange(fn: (dateRangeString: string) => void): void {
    this.fnFormRegisterOnChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.fnFormRegisterOnTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup?.disable();
    } else {
      this.formGroup?.enable();
    }
  }

}
