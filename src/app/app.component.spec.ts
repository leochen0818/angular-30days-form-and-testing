import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('accountValueChange', () => {

    it('should set value into property "account"', () => {
      // Arrange
      const account = 'abc123@mail.com';
      const errors = null;
      // Act
      component.accountValueChange(account, errors);
      // Assert
      expect(component.account).toBe(account);
    });

    it('should set the required error message into property "accountErrorMessage" when the value is empty string', () => {
      // Arrange
      const account = '';
      const errors = { required: true };
      const accountErrorMessage = '此欄位必填';
      // Act
      component.accountValueChange(account, errors);
      // Assert
      expect(component.accountErrorMessage).toBe(accountErrorMessage);
    });

    it('should set the pattern error message into property "accountErrorMessage" when the value is not the correct pattern', () => {
      // Arrange
      const account = 'abc123';
      const errors = {
        pattern: {
          actualValue: 'abc123',
          requiredPattern: '^\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b$'
        }
      };
      const accountErrorMessage = '格式有誤，請重新輸入';
      // Act
      component.accountValueChange(account, errors);
      // Assert
      expect(component.accountErrorMessage).toBe(accountErrorMessage);
    });

    it('should set empty string into property "accountErrorMessage" when the value is the correct pattern', () => {
      // Arrange
      const account = 'abc123@mail.com';
      const errors = null;
      const accountErrorMessage = '';
      // Act
      component.accountValueChange(account, errors);
      // Assert
      expect(component.accountErrorMessage).toBe(accountErrorMessage);
    });
  });

  describe('passwordValueChange', () => {

    it('should set value into property "password"', () => {
      // Arrange
      const password = 'abc123';
      const errors = null;
      // Act
      component.passwordValueChange(password, errors);
      // Assert
      expect(component.password).toBe(password);
    });

    it('should set the required error message into property "passwordErrorMessage" when the value is empty string', () => {
      // Arrange
      const password = '';
      const errors = { required: true };
      const passwordErrorMessage = '此欄位必填';
      // Act
      component.passwordValueChange(password, errors);
      // Assert
      expect(component.passwordErrorMessage).toBe(passwordErrorMessage);
    });

    it('should set the pattern error message into property "passwordErrorMessage" when the value is not the correct pattern', () => {
      // Arrange
      const password = 'abc123';
      const errors = {
        minlength: {
          actualLength: 7,
          requiredLength: 8
        }
      };
      const passwordErrorMessage = '密碼長度最短不得低於8碼';
      // Act
      component.passwordValueChange(password, errors);
      // Assert
      expect(component.passwordErrorMessage).toBe(passwordErrorMessage);
    });

    it('should set empty string into property "passwordErrorMessage" when the value is the correct pattern', () => {
      // Arrange
      const password = 'abcd1234';
      const errors = null;
      const passwordErrorMessage = '';
      // Act
      component.passwordValueChange(password, errors);
      // Assert
      expect(component.passwordErrorMessage).toBe(passwordErrorMessage);
    });
  });
});
