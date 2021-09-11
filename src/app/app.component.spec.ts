import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });


  describe('Unit testing', () => {
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

  describe('Integration testing', () => {
    let compiledComponent: HTMLElement;

    beforeEach(() => {
      fixture.detectChanges();
      compiledComponent = fixture.nativeElement;
    });

    describe('Account input field', () => {
      let accountInputElement: HTMLInputElement;

      beforeEach(() => {
        accountInputElement = compiledComponent.querySelector('#account')!;
      });

      it('should have attribute "type" and the value is "email"', () => {
        // Arrange
        const attributeName = 'type';
        const attributeValue = 'email';
        // Assert
        expect(accountInputElement.getAttribute(attributeName)).toBe(attributeValue);
      });

      it('should have attribute "name" and the value is "account"', () => {
        // Arrange
        const attributeName = 'name';
        const attributeValue = 'account';
        // Assert
        expect(accountInputElement.getAttribute(attributeName)).toBe(attributeValue);
      });

      it('should have attribute "pattern" and the value is "\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b"', () => {
        // Arrange
        const attributeName = 'pattern';
        const attributeValue = '\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b';
        // Assert
        expect(accountInputElement.getAttribute(attributeName)).toBe(attributeValue);
      });

      it('should have attribute "required"', () => {
        // Arrange
        const attributeName = 'required';
        // Assert
        expect(accountInputElement.hasAttribute(attributeName)).toBe(true);
      });

      it('should binding the value of property "account"', () => {
        // Arrange
        const account = 'whatever';
        // Act
        component.account = account;
        fixture.detectChanges();
        // Assert
        expect(accountInputElement.getAttribute('ng-reflect-model')).toBe(account);
      });

      it('should trigger function "accountValueChange" when the value be changed', () => {
        // Arrange
        spyOn(component, 'accountValueChange');
        const accountNgModel = component.accountNgModelRef;
        // Act
        accountInputElement.value = 'whatever';
        accountInputElement.dispatchEvent(new Event('ngModelChange'));
        // Assert
        expect(component.accountValueChange).toHaveBeenCalledWith(accountNgModel.value, accountNgModel.errors);
      });
    });

    describe('Password input field', () => {
      let passwordInputElement: HTMLInputElement;

      beforeEach(() => {
        passwordInputElement = compiledComponent.querySelector('#password')!;
      });

      it('should have attribute "type" and the value is "password"', () => {
        // Arrange
        const attributeName = 'type';
        const attributeValue = 'password';
        // Assert
        expect(passwordInputElement.getAttribute(attributeName)).toBe(attributeValue);
      });

      it('should have attribute "name" and the value is "password"', () => {
        // Arrange
        const attributeName = 'name';
        const attributeValue = 'password';
        // Assert
        expect(passwordInputElement.getAttribute(attributeName)).toBe(attributeValue);
      });

      it('should have attribute "minlength" and the value is "8"', () => {
        // Arrange
        const attributeName = 'minlength';
        const attributeValue = '8';
        // Assert
        expect(passwordInputElement.getAttribute(attributeName)).toBe(attributeValue);
      });

      it('should have attribute "maxlength" and the value is "16"', () => {
        // Arrange
        const attributeName = 'maxlength';
        const attributeValue = '16';
        // Assert
        expect(passwordInputElement.getAttribute(attributeName)).toBe(attributeValue);
      });

      it('should have attribute "required"', () => {
        // Arrange
        const attributeName = 'required';
        // Assert
        expect(passwordInputElement.hasAttribute(attributeName)).toBe(true);
      });

      it('should binding the value of property "password"', () => {
        // Arrange
        const password = 'whatever';
        // Act
        component.password = password;
        fixture.detectChanges();
        // Assert
        expect(passwordInputElement.getAttribute('ng-reflect-model')).toBe(password);
      });

      it('should trigger function "passwordValueChange" when the value be changed', () => {
        // Arrange
        spyOn(component, 'passwordValueChange');
        const passwordNgModel = component.passwordNgModelRef;
        // Act
        passwordInputElement.value = 'whatever';
        passwordInputElement.dispatchEvent(new Event('ngModelChange'));
        // Assert
        expect(component.passwordValueChange).toHaveBeenCalledWith(passwordNgModel.value, passwordNgModel.errors);
      });
    });

    describe('Error Message', () => {
      it('should binding the value of property "accountErrorMessage" in the template', () => {
        // Arrange
        const errorMessage = 'account error';
        const targetElement = compiledComponent.querySelector('#account + .error-message');
        // Act
        component.accountErrorMessage = errorMessage;
        fixture.detectChanges();
        // Assert
        expect(targetElement?.textContent).toBe(errorMessage);
      });

      it('should binding the value of property "passwordErrorMessage" in the template', () => {
        // Arrange
        const errorMessage = 'password error';
        const targetElement = compiledComponent.querySelector('#password + .error-message');
        // Act
        component.passwordErrorMessage = errorMessage;
        fixture.detectChanges();
        // Assert
        expect(targetElement?.textContent).toBe(errorMessage);
      });
    });

    describe('Login button', () => {
      let buttonElement: HTMLButtonElement;

      beforeEach(() => {
        buttonElement = compiledComponent.querySelector('button')!;
      });

      it('should have attribute "type" and the value is "submit"', () => {
        // Arrange
        const attributeName = 'type';
        const attributeValue = 'submit';
        // Assert
        expect(buttonElement.getAttribute(attributeName)).toBe(attributeValue);
      });

      xit('should have attribute "disabled" when the form\'s status is invalid', () => {
        // Arrange
        const attributeName = 'disabled';
        // Assert
        expect(buttonElement.hasAttribute(attributeName)).toBe(true);
      });

      describe('When the form\'s status is valid', () => {
        beforeEach(() => {
          component.account = 'abc@email.com';
          component.password = '12345678';
          fixture.detectChanges();
        });

        it('should not have attribute "disabled"', () => {
          // Arrange
          const attributeName = 'disabled';
          // Assert
          expect(buttonElement.hasAttribute(attributeName)).toBe(false);
        });

        it('should trigger function "login" when being clicked', () => {
          // Arrange
          spyOn(component, 'login');
          // Act
          buttonElement.click();
          // Assert
          expect(component.login).toHaveBeenCalled();
        });
      });
    });
  });
});
