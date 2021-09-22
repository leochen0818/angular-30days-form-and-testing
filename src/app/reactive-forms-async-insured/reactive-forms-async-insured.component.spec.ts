import { FormsModule, ReactiveFormsModule, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsAsyncInsuredComponent } from './reactive-forms-async-insured.component';

describe('ReactiveFormsAsyncInsuredComponent', () => {
  let component: ReactiveFormsAsyncInsuredComponent;
  let fixture: ComponentFixture<ReactiveFormsAsyncInsuredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactiveFormsAsyncInsuredComponent],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormsAsyncInsuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Unit testing', () => {
    describe('formArray', () => {
      it('should get the FormArray from the FormGroup', () => {
        // Act
        const formArray = component.formGroup?.get('insuredList') as FormArray;
        // Assert
        expect(component.formArray).toBe(formArray);
      });
    });

    describe('isFormInvalid', () => {
      it('should be true when there are not any insureds', () => {
        // Act
        const expectedResult = component.isFormInvalid;
        // Assert
        expect(expectedResult).toBe(true);
      });

      it('should be true when there are any errors', () => {
        // Arrange
        const formControl = new FormControl('', Validators.required);
        component.formArray.push(formControl);
        // Act
        const expectedResult = component.isFormInvalid;
        // Assert
        expect(expectedResult).toBe(true);
      });

      it('should be false when there are not any errors', () => {
        // Arrange
        const formControl = new FormControl('');
        component.formArray.push(formControl);
        // Act
        const expectedResult = component.isFormInvalid;
        // Assert
        expect(expectedResult).toBe(false);
      });
    });

    describe('ngOnInit', () => {
      it('should initialize property "formGroup"', () => {
        // Assert
        expect(component.formGroup).toBeInstanceOf(FormGroup);
      });
    });

    describe('addInsured', () => {
      it('should push a "formGroup" into the "formArray"', () => {
        // Act
        component.addInsured();
        // Assert
        expect(component.formArray.length).toBe(1);
      });
    });

    describe('deleteInsured', () => {
      it('should remove the "formGroup" from the "formArray" by the index', () => {
        // Arrange
        const index = 0;
        const formGroup = new FormGroup({});
        component.formArray.push(formGroup);
        // Act
        component.deleteInsured(index);
        // Assert
        expect(component.formArray.length).toBe(0);
      });
    });

    describe('getErrorMessage', () => {
      let formGroup: FormGroup;

      beforeEach(() => {
        const nameControl = new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10)
        ]);
        formGroup = new FormGroup({
          name: nameControl,
        });
        component.formArray.push(formGroup);
      });

      it('should return empty string with the wrong key', () => {
        // Arrange
        const key = 'leo'
        const index = 0;
        // Act
        const errorMessage = component.getErrorMessage(key, index);
        // Assert
        expect(errorMessage).toBe('');
      });

      it('should return empty string when the "formControl" without errors', () => {
        // Arrange
        const key = 'name'
        const index = 0;
        formGroup.get(key)?.setValue('Leo');
        // Act
        const errorMessage = component.getErrorMessage(key, index);
        // Assert
        expect(errorMessage).toBe('');
      });

      it('should return empty string when property "pristine" of the "formControl" is `true`', () => {
        // Arrange
        const key = 'name'
        const index = 0;
        // Act
        const errorMessage = component.getErrorMessage(key, index);
        // Assert
        expect(errorMessage).toBe('');
      });

      it('should return "此欄位必填" when the "formControl" has the required error', () => {
        // Arrange
        const key = 'name'
        const index = 0;
        formGroup.get(key)?.markAsDirty();
        // Act
        const errorMessage = component.getErrorMessage(key, index);
        // Assert
        expect(errorMessage).toBe('此欄位必填');
      });

      it('should return "姓名至少需兩個字以上" when the "formControl" has the min-length error', () => {
        // Arrange
        const key = 'name'
        const index = 0;
        const formControl = formGroup.get(key)!;
        formControl.setValue('A')
        formControl.markAsDirty();
        // Act
        const errorMessage = component.getErrorMessage(key, index);
        // Assert
        expect(errorMessage).toBe('姓名至少需兩個字以上');
      });

      it('should return "姓名至多只能輸入十個字" when the "formControl" has the max-length error', () => {
        // Arrange
        const key = 'name'
        const index = 0;
        const formControl = formGroup.get(key)!;
        formControl.setValue('ABCDEF123456')
        formControl.markAsDirty();
        // Act
        const errorMessage = component.getErrorMessage(key, index);
        // Assert
        expect(errorMessage).toBe('姓名至多只能輸入十個字');
      });
    });
  });

  describe('Integration testing', () => {
    let compiledComponent: HTMLElement;

    beforeEach(() => {
      compiledComponent = fixture.nativeElement;
    });

    describe('the insured fields', () => {
      let formGroup: FormGroup;

      beforeEach(() => {
        const nameControl = new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10)
        ]);
        const genderControl = new FormControl('', Validators.required);
        const ageControl = new FormControl('', Validators.required);
        formGroup = new FormGroup({
          name: nameControl,
          gender: genderControl,
          age: ageControl
        });
        component.formArray.push(formGroup);
        fixture.detectChanges();
      });

      describe('the name input field', () => {
        let nameInputElement: HTMLInputElement;

        beforeEach(() => {
          nameInputElement = compiledComponent.querySelector('#name-0')!;
        });

        it('should have attribute "type" and the value is "text"', () => {
          // Arrange
          const attributeName = 'type';
          const attributeValue = 'text';
          // Assert
          expect(nameInputElement.getAttribute(attributeName)).toBe(attributeValue);
        });

        it('should have attribute "formControlName" and the value is "name"', () => {
          // Arrange
          const attributeName = 'formControlName';
          const attributeValue = 'name';
          // Assert
          expect(nameInputElement.getAttribute(attributeName)).toBe(attributeValue);
        });

        describe('Error Messages', () => {
          let nameFormControl: FormControl;

          beforeEach(() => {
            nameFormControl = formGroup.get('name') as FormControl;
          });

          it('should be empty string when property "pristine" of the "formControl" is `true`', () => {
            // Arrange
            const targetElement = compiledComponent.querySelector('#name-0 + .error-message');
            // Assert
            expect(targetElement?.textContent).toBe('');
          });

          describe('when the field is dirty', () => {

            beforeEach(() => {
              nameFormControl.markAsDirty();
              fixture.detectChanges();
            });

            it('should be "此欄位必填" when the value is empty string', () => {
              // Arrange
              const errorMessage = '此欄位必填';
              const targetElement = compiledComponent.querySelector('#name-0 + .error-message');
              // Assert
              expect(targetElement?.textContent).toBe(errorMessage);
            });

            it('should be "姓名至少需兩個字以上" when the value\'s length less than 2', () => {
              // Arrange
              nameFormControl.setValue('A')
              const errorMessage = '姓名至少需兩個字以上';
              const targetElement = compiledComponent.querySelector('#name-0 + .error-message');
              // Act
              fixture.detectChanges();
              // Assert
              expect(targetElement?.textContent).toBe(errorMessage);
            });

            it('should be "姓名至多只能輸入十個字" when the value\'s length greater than 10', () => {
              // Arrange
              nameFormControl.setValue('ABCDE123456')
              const errorMessage = '姓名至多只能輸入十個字';
              const targetElement = compiledComponent.querySelector('#name-0 + .error-message');
              // Act
              fixture.detectChanges();
              // Assert
              expect(targetElement?.textContent).toBe(errorMessage);
            });

            it('should be empty string when there are not any errors', () => {
              // Arrange
              nameFormControl.setValue('ABCDE123456')
              const errorMessage = '姓名至多只能輸入十個字';
              const targetElement = compiledComponent.querySelector('#name-0 + .error-message');
              // Act
              fixture.detectChanges();
              // Assert
              expect(targetElement?.textContent).toBe(errorMessage);
            });
          });
        });
      });

      describe('the gender radio buttons', () => {
        let radioButtonElement: HTMLInputElement;

        describe('male', () => {
          beforeEach(() => {
            radioButtonElement = compiledComponent.querySelector(`#male-0`)!;
          });

          it('should have attribute "type" and the value is "radio"', () => {
            // Arrange
            const attributeName = 'type';
            const attributeValue = 'radio';
            // Assert
            expect(radioButtonElement.getAttribute(attributeName)).toBe(attributeValue);
          });

          it('should have attribute "formControlName" and the value is "gender"', () => {
            // Arrange
            const attributeName = 'formControlName';
            const attributeValue = 'gender';
            // Assert
            expect(radioButtonElement.getAttribute(attributeName)).toBe(attributeValue);
          });

          it('should have attribute "value" and the value is "male"', () => {
            // Arrange
            const attributeName = 'value';
            const attributeValue = 'male';
            // Assert
            expect(radioButtonElement.getAttribute(attributeName)).toBe(attributeValue);
          });
        });

        describe('female', () => {
          beforeEach(() => {
            radioButtonElement = compiledComponent.querySelector(`#female-0`)!;
          });

          it('should have attribute "type" and the value is "radio"', () => {
            // Arrange
            const attributeName = 'type';
            const attributeValue = 'radio';
            // Assert
            expect(radioButtonElement.getAttribute(attributeName)).toBe(attributeValue);
          });

          it('should have attribute "formControlName" and the value is "gender"', () => {
            // Arrange
            const attributeName = 'formControlName';
            const attributeValue = 'gender';
            // Assert
            expect(radioButtonElement.getAttribute(attributeName)).toBe(attributeValue);
          });

          it('should have attribute "value" and the value is "female"', () => {
            // Arrange
            const attributeName = 'value';
            const attributeValue = 'female';
            // Assert
            expect(radioButtonElement.getAttribute(attributeName)).toBe(attributeValue);
          });
        });
      });

      describe('the age field', () => {
        const key = 'age-0'
        let ageSelectElement: HTMLSelectElement;

        beforeEach(() => {
          ageSelectElement = compiledComponent.querySelector(`#${key}`)!;
        });

        it('should have attribute "formControlName" and the value is "age"', () => {
          // Arrange
          const attributeName = 'formControlName';
          const attributeValue = 'age';
          // Assert
          expect(ageSelectElement.getAttribute(attributeName)).toBe(attributeValue);
        });

        describe('Error Messages', () => {
          let ageFormControl: FormControl;

          beforeEach(() => {
            ageFormControl = formGroup.get('age') as FormControl;
          });

          it('should be empty string when property "pristine" of the "formControl" is `true`', () => {
            // Arrange
            const targetElement = compiledComponent.querySelector('#age-0 + .error-message');
            // Assert
            expect(targetElement?.textContent).toBe('');
          });

          describe('when the field is dirty', () => {
            beforeEach(() => {
              ageFormControl.markAsDirty();
              fixture.detectChanges();
            });

            it('should be "此欄位必填" when the value is empty string', () => {
              // Arrange
              const errorMessage = '此欄位必填';
              const targetElement = compiledComponent.querySelector('#age-0 + .error-message');
              // Assert
              expect(targetElement?.textContent).toBe(errorMessage);
            });
          });
        });
      });

      describe('Delete insured button', () => {
        it('should trigger function `deleteInsured` after being clicked', () => {
          // Arrange
          const index = 0;
          const deleteButtonElement = compiledComponent.querySelector('fieldset button[type="button"]') as HTMLElement;
          spyOn(component, 'deleteInsured');
          // Act
          deleteButtonElement.click();
          // Assert
          expect(component.deleteInsured).toHaveBeenCalledWith(index);
        });
      });
    });

    describe('add insured button', () => {
      it('should trigger function `addInsured` after being clicked', () => {
        // Arrange
        const addButtonElement = compiledComponent.querySelector('p:last-child button[type="button"]') as HTMLElement;
        spyOn(component, 'addInsured');
        // Act
        addButtonElement.click();
        // Assert
        expect(component.addInsured).toHaveBeenCalled();
      });
    });

    describe('submit button', () => {
      let buttonElement: HTMLButtonElement;

      beforeEach(() => {
        buttonElement = compiledComponent.querySelector('button[type="submit"]') as HTMLButtonElement;
      });

      it('should be existing', () => {
        // Assert
        expect(buttonElement).toBeTruthy();
      });

      it('should be disabled when there are not any insureds', () => {
        // Assert
        expect(buttonElement.hasAttribute('disabled')).toBe(true);
      });

      describe('When there is a insured', () => {
        let formGroup: FormGroup;

        beforeEach(() => {
          const nameControl = new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(10)
          ]);
          const genderControl = new FormControl('', Validators.required);
          const ageControl = new FormControl('', Validators.required);
          formGroup = new FormGroup({
            name: nameControl,
            gender: genderControl,
            age: ageControl
          });
          component.formArray.push(formGroup);
          fixture.detectChanges();
        });

        it('should be disabled when there ara any verifying errors that insured\'s data', () => {
          // Arrange
          compiledComponent.querySelector('button[type="submit"]')
          // Act
          fixture.detectChanges();
          // Assert
          expect(buttonElement.hasAttribute('disabled')).toBe(true);
        })

        it('should be enabled when there ara any verifying errors that insured\'s data', () => {
          // Arrange
          formGroup.patchValue({
            name: 'Leo',
            gender: 'male',
            age: '18',
          });
          // Act
          fixture.detectChanges();
          // Assert
          expect(buttonElement.hasAttribute('disabled')).toBe(false);
        })
      });
    });
  });
});
