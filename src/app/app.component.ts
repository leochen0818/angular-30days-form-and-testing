import { Component } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  account = '';
  password = '';
  accountErrorMessage = '';
  passwordErrorMessage = '';

  accountValueChange(accountControl: FormControl): void {
    this.account = accountControl.value;
    this.validationCheck(accountControl.errors, 'account');
  }

  passwordValueChange(passwordControl: FormControl): void {
    this.password = passwordControl.value;
    this.validationCheck(passwordControl.errors, 'password');
  }

  login(): void {
    // do login...
  }

  private validationCheck(
    errors: ValidationErrors | null,
    fieldName: 'account' | 'password'
  ): void {
    let errorMessage = '';
    if (!errors) {
      errorMessage = '';
    } else if (errors.required) {
      errorMessage = '此欄位必填';
    } else if (errors.pattern) {
      errorMessage = '格式有誤，請重新輸入';
    } else if (errors.minlength) {
      errorMessage = '密碼長度最短不得低於8碼';
    }
    this.setErrorMessage(fieldName, errorMessage);
  }

  private setErrorMessage(
    fieldName: 'account' | 'password',
    errorMessage: string
  ): void {
    if (fieldName === 'account') {
      this.accountErrorMessage = errorMessage;
    } else {
      this.passwordErrorMessage = errorMessage;
    }
  }
}
