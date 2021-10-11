import { Pipe, PipeTransform } from '@angular/core';

import {
  DateErrors,
  RequiredError,
  PatternError,
  InexistentDateError,
  LessThanStartDateError,
  GreaterThanStartDateError,
} from './date-range.type';

@Pipe({
  name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {
  transform(errors: null | DateErrors, ...args: unknown[]): string {
    if (errors) {
      if ((errors as RequiredError).required) {
        return '此欄位必填';
      } else if ((errors as PatternError).pattern) {
        return '日期格式不正確';
      } else if ((errors as InexistentDateError).inexistentDate) {
        return '此日期不存在';
      } else if ((errors as LessThanStartDateError).lessThanStartDate) {
        return '迄日不可早於起日';
      } else if ((errors as GreaterThanStartDateError).greaterThanStartDate) {
        return '迄日不可晚於起日超過七天';
      }
    }
    return '';
  }
}
