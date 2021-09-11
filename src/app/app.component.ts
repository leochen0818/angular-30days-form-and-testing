import { Component, ViewChild } from '@angular/core';
import { ValidationErrors, NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('accountNgModel') accountNgModelRef!: NgModel;
  @ViewChild('passwordNgModel') passwordNgModelRef!: NgModel;

  account = '';
  password = '';
  accountErrorMessage = '';
  passwordErrorMessage = '';

  accountValueChange(account: string, errors: ValidationErrors | null): void {
    this.account = account;
    this.validationCheck(errors, 'account');
  }

  passwordValueChange(password: string, errors: ValidationErrors | null): void {
    this.password = password;
    this.validationCheck(errors, 'password');
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
