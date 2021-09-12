import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';

import { ReactiveFormsLoginComponent } from './reactive-forms-login.component';

describe('ReactiveFormsLoginComponent', () => {
  let component: ReactiveFormsLoginComponent;
  let fixture: ComponentFixture<ReactiveFormsLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactiveFormsLoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormsLoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('formGroup', () => {
    it('should be undefined before init', () => {
      // Assert
      expect(component.formGroup).toBeFalsy();
    });

    describe('after ngInit', () => {

      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should be instance of FormGroup', () => {
        // Assert
        expect(component.formGroup).toBeInstanceOf(FormGroup);
      });

      it('should have 2 form controls', () => {
        // Arrange
        const formControls = component.formGroup!.controls;
        const controlLength = Object.keys(formControls).length;
        // Assert
        expect(controlLength).toBe(2);
      });

      describe('accountFormControl', () => {
        it('should have the required validator', () => {
          // Arrange
          const error = component.accountControl.errors!;
          // Assert
          expect(error.required).toBe(true);
        });

        it('should have the email pattern validator', () => {
          // Arrange
          component.accountControl.setValue('abc');
          const error = component.accountControl.errors!;
          const expectedPattern = '/^\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b$/gi';
          // Assert
          expect(error.pattern.requiredPattern).toBe(expectedPattern);
        });

      });

      describe('passwordFormControl', () => {
        it('should have the required validator', () => {
          // Arrange
          const error = component.accountControl.errors!;
          // Assert
          expect(error.required).toBe(true);
        });

        it('should have the min-length validator', () => {
          // Arrange
          component.passwordControl.setValue('abc');
          const error = component.passwordControl.errors!;
          // Assert
          expect(error.minlength.requiredLength).toBe(8);
        });

        it('should have the max-length validator', () => {
          // Arrange
          component.passwordControl.setValue('12345678901234567');
          const error = component.passwordControl.errors!;
          // Assert
          expect(error.maxlength.requiredLength).toBe(16);
        });
      });
    });
  });

  describe('getErrorMessage', () => {
    it('should get empty string when the value is correct', () => {
      // Arrange
      const formControl = new FormControl('');
      const expectedMessage = '';
      // Act
      const message = component.getErrorMessage(formControl);
      // Assert
      expect(message).toBe(expectedMessage);
    });

    it('should get empty string when the value is empty string but the form control is pristine', () => {
      // Arrange
      const formControl = new FormControl('', [Validators.required]);
      const expectedMessage = '';
      // Act
      const message = component.getErrorMessage(formControl);
      // Assert
      expect(message).toBe(expectedMessage);
    });

    it('should get "此欄位必填" when the value is empty string but the form control', () => {
      // Arrange
      const formControl = new FormControl('', [Validators.required]);
      const expectedMessage = '此欄位必填';
      // Act
      formControl.markAsDirty();
      const message = component.getErrorMessage(formControl);
      // Assert
      expect(message).toBe(expectedMessage);
    });

    it('should get "格式有誤，請重新輸入" when the value is empty string but the form control', () => {
      // Arrange
      const formControl = new FormControl('whatever', [Validators.pattern('/^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/gi')]);
      const expectedMessage = '格式有誤，請重新輸入';
      // Act
      formControl.markAsDirty();
      const message = component.getErrorMessage(formControl);
      // Assert
      expect(message).toBe(expectedMessage);
    });

    it('should get "密碼長度最短不得低於8碼" when the value is empty string but the form control', () => {
      // Arrange
      const formControl = new FormControl('abc', [Validators.minLength(8)]);
      const expectedMessage = '密碼長度最短不得低於8碼';
      // Act
      formControl.markAsDirty();
      const message = component.getErrorMessage(formControl);
      // Assert
      expect(message).toBe(expectedMessage);
    });

    it('should get "密碼長度最長不得超過16碼" when the value is empty string but the form control', () => {
      // Arrange
      const formControl = new FormControl('12345678901234567', [Validators.maxLength(16)]);
      const expectedMessage = '密碼長度最長不得超過16碼';
      // Act
      formControl.markAsDirty();
      const message = component.getErrorMessage(formControl);
      // Assert
      expect(message).toBe(expectedMessage);
    });
  });

});
