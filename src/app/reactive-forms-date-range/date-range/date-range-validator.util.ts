import { ValidatorFn } from '@angular/forms';

import { DateRangeValidationErrors } from './date-range.type';

export const dateRangeValidator: ValidatorFn = (formGroup) => {
  const startDateControl = formGroup.get('startDate')!;
  const endDateControl = formGroup.get('endDate')!;

  let errors: DateRangeValidationErrors = {
    dateRange: {
      startDate: null,
      endDate: null,
    }
  };

  if (startDateControl.errors) {
    errors.dateRange.startDate = startDateControl.errors;
  } else if (!isDateExist(startDateControl.value)) {
    errors.dateRange.startDate = { inexistentDate: true };
  }

  if (endDateControl.errors) {
    errors.dateRange.endDate = endDateControl.errors;
  } else if (endDateControl.value) {
    if (!isDateExist(endDateControl.value)) {
      errors.dateRange.endDate = { inexistentDate: true };
    } else if (!errors.dateRange.startDate) {
      const startDateTimeStamp = new Date(startDateControl.value).getTime();
      const endDateTimeStamp = new Date(endDateControl.value).getTime();
      const dayInMilliseconds = 24 * 60 * 60 * 1000;
      const duration = 7 * dayInMilliseconds;
      if (endDateTimeStamp < startDateTimeStamp) {
        errors.dateRange.endDate = { lessThanStartDate: true };
      } else if (endDateTimeStamp - duration > startDateTimeStamp) {
        errors.dateRange.endDate = {
          greaterThanStartDate: {
            actualGreater: (endDateTimeStamp - startDateTimeStamp) / dayInMilliseconds,
            requiredGreater: 7
          }
        }
      }
    }
  }

  if (!errors.dateRange.startDate && !errors.dateRange.endDate) {
    return null;
  }
  return errors;
};

export const isDateExist = (dateString: string) => {
  const dateObj = dateString.split('-'); // yyyy-mm-dd

  //列出12個月，每月最大日期限制
  const limitInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const theYear = parseInt(dateObj[0]);
  const theMonth = parseInt(dateObj[1]);
  const theDay = parseInt(dateObj[2]);
  const isLeap = new Date(theYear, 2, 0).getDate() === 29; // 是否為閏年?

  if (isLeap) {
    // 若為閏年，最大日期限制改為 29
    limitInMonth[1] = 29;
  }

  // 月份不可以大於 12， 並比對該日是否超過每個月份最大日期限制
  return theMonth < 12 && theDay <= limitInMonth[theMonth - 1];
}
