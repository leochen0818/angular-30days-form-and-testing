import { ValidationErrors } from '@angular/forms';

export type DateRangeValidationErrors = {
  dateRange: {
    startDate: null | DateErrors;
    endDate: null | DateErrors;
  }
};

export type DateErrors =
  | RequiredError
  | PatternError
  | InexistentDateError
  | LessThanStartDateError
  | GreaterThanStartDateError
  | ValidationErrors;

export type RequiredError = {
  required: true;
};

export type PatternError = {
  pattern: {
    actualValue: string;
    requiredPattern: string;
  }
};

export type InexistentDateError = {
  inexistentDate: true;
};

export type LessThanStartDateError = {
  lessThanStartDate: true;
};

export type GreaterThanStartDateError = {
  greaterThanStartDate: {
    actualGreater: number;
    requiredGreater: number;
  }
};
