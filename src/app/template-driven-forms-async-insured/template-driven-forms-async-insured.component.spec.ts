import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDrivenFormsAsyncInsuredComponent } from './template-driven-forms-async-insured.component';
import { Insured } from './insured.type';

describe('TemplateDrivenFormsAsyncInsuredComponent', () => {
  let component: TemplateDrivenFormsAsyncInsuredComponent;
  let fixture: ComponentFixture<TemplateDrivenFormsAsyncInsuredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateDrivenFormsAsyncInsuredComponent],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateDrivenFormsAsyncInsuredComponent);
    component = fixture.componentInstance;
  });

  describe('Unit testing', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });


    describe('trackByIndex', () => {
      it('should just return the index', () => {
        // Arrange
        const index = 0;
        // Assert
        expect(component.trackByIndex(index)).toBe(index);
      })
    });

    describe('insuredNameChange', () => {
      let insured: Insured;

      beforeEach(() => {
        insured = {
          name: '',
          gender: '',
          age: '',
          nameErrorMessage: '',
          ageErrorMessage: ''
        };
      });

      it('should assign the value of the formControl to property "name" of the insured', () => {
        // Arrange
        const value = 'Leo';
        const errors = null;
        // Act
        component.insuredNameChange(value, errors, insured);
        // Assert
        expect(insured.name).toBe(value);
      });

      it('should assign error message "此欄位必填" to property "nameErrorMessage" of the insured when the value of the formControl is empty string', () => {
        // Arrange
        const value = '';
        const errors = { required: true };
        const errorMessage = '此欄位必填';
        // Act
        component.insuredNameChange(value, errors, insured);
        // Assert
        expect(insured.nameErrorMessage).toBe(errorMessage);
      });

      it('should assign error message "姓名至少需兩個字以上" to property "nameErrorMessage" of the insured when the value\;s length of the formControl less than 2', () => {
        // Arrange
        const value = 'L';
        const errors = {
          minlength: {
            actualLength: 1,
            requiredLength: 2
          }
        };
        const errorMessage = '姓名至少需兩個字以上';
        // Act
        component.insuredNameChange(value, errors, insured);
        // Assert
        expect(insured.nameErrorMessage).toBe(errorMessage);
      });
    });

    describe('insuredAgeChange', () => {
      let insured: Insured;

      beforeEach(() => {
        insured = {
          name: '',
          gender: '',
          age: '',
          nameErrorMessage: '',
          ageErrorMessage: ''
        };
      });

      it('should assign the value of the formControl to property "age" of the insured', () => {
        // Arrange
        const age = '18';
        const errors = null;
        // Act
        component.insuredAgeChange(age, errors, insured);
        // Assert
        expect(insured.age).toBe(age);
      });

      it('should assign error message "此欄位必填" to property "ageErrorMessage" of the insured when the value of the formControl is empty string', () => {
        // Arrange
        const age = '';
        const errors = { required: true };
        const errorMessage = '此欄位必填';
        // Act
        component.insuredAgeChange(age, errors, insured);
        // Assert
        expect(insured.ageErrorMessage).toBe(errorMessage);
      });
    });

    describe('addInsured', () => {
      it('should add a new insured data into property "insuredList" after being triggered', () => {
        // Arrange
        const expectResult: Insured[] = [{
          name: '',
          gender: '',
          age: '',
          nameErrorMessage: '',
          ageErrorMessage: ''
        }];
        // Act
        component.addInsured();
        // Assert
        expect(component.insuredList).toEqual(expectResult);
      });
    });

    describe('deleteInsured', () => {
      it('should delete the insured data by the index after being triggered', () => {
        // Arrange
        component.insuredList = [{
          name: '',
          gender: '',
          age: '',
          nameErrorMessage: '',
          ageErrorMessage: ''
        }];
        // Act
        component.deleteInsured(0);
        // Assert
        expect(component.insuredList).toEqual([]);
      });
    });
  });

  describe('Integration testing', () => {
    let compiledComponent: HTMLElement;

    beforeEach(() => {
      fixture.detectChanges();
      compiledComponent = fixture.nativeElement;
    });

    describe('the insured fields', () => {
      beforeEach(() => {
        component.insuredList = [{
          name: '',
          gender: '',
          age: '',
          nameErrorMessage: '',
          ageErrorMessage: ''
        }];
        fixture.detectChanges();
      });

      describe('the name input field', () => {
        const key = 'name-0'
        let nameInputElement: HTMLInputElement;

        beforeEach(() => {
          nameInputElement = compiledComponent.querySelector(`#${key}`)!;
        });

        it('should have attribute "type" and the value is "text"', () => {
          // Arrange
          const attributeName = 'type';
          const attributeValue = 'text';
          // Assert
          expect(nameInputElement.getAttribute(attributeName)).toBe(attributeValue);
        });

        it('should have attribute "name" and the value is "name-0"', () => {
          // Arrange
          const attributeName = 'ng-reflect-name';
          const attributeValue = key;
          // Assert
          expect(nameInputElement.getAttribute(attributeName)).toBe(attributeValue);
        });

        it('should have attribute "minlength" and the value is "2"', () => {
          // Arrange
          const attributeName = 'minlength';
          const attributeValue = '2';
          // Assert
          expect(nameInputElement.getAttribute(attributeName)).toBe(attributeValue);
        });

        it('should have attribute "maxlength" and the value is "10"', () => {
          // Arrange
          const attributeName = 'maxlength';
          const attributeValue = '10';
          // Assert
          expect(nameInputElement.getAttribute(attributeName)).toBe(attributeValue);
        });

        it('should have attribute "required"', () => {
          // Arrange
          const attributeName = 'required';
          // Assert
          expect(nameInputElement.hasAttribute(attributeName)).toBe(true);
        });

        it('should binding the value of the insured\'s property "name"', () => {
          // Arrange
          const name = 'whatever';
          // Act
          component.insuredList[0].name = name;
          fixture.detectChanges();
          // Assert
          expect(nameInputElement.getAttribute('ng-reflect-model')).toBe(name);
        });

        it('should trigger function "insuredNameChange" when the value be changed', () => {
          // Arrange
          spyOn(component, 'insuredNameChange');
          const nameNgModel = component.nameNgModelRefList.get(0)!;
          // Act
          nameInputElement.value = 'whatever';
          nameInputElement.dispatchEvent(new Event('ngModelChange'));
          // Assert
          expect(component.insuredNameChange).toHaveBeenCalledWith(nameNgModel.value, nameNgModel.errors, component.insuredList[0]);
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

          it('should have attribute "name" and the value is "gender-0"', () => {
            // Arrange
            const attributeName = 'ng-reflect-name';
            const attributeValue = 'gender-0';
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

          it('should have attribute "required"', () => {
            // Arrange
            const attributeName = 'required';
            // Assert
            expect(radioButtonElement.hasAttribute(attributeName)).toBe(true);
          });

          it('should binding the value of the insured\'s property "gender"', () => {
            // Arrange
            const gender = 'male';
            // Act
            component.insuredList[0].gender = gender;
            fixture.detectChanges();
            // Assert
            expect(radioButtonElement.getAttribute('ng-reflect-model')).toBe(gender);
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

          it('should have attribute "name" and the value is "gender-0"', () => {
            // Arrange
            const attributeName = 'ng-reflect-name';
            const attributeValue = 'gender-0';
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

          it('should have attribute "required"', () => {
            // Arrange
            const attributeName = 'required';
            // Assert
            expect(radioButtonElement.hasAttribute(attributeName)).toBe(true);
          });

          it('should binding the value of the insured\'s property "gender"', () => {
            // Arrange
            const gender = 'female';
            // Act
            component.insuredList[0].gender = gender;
            fixture.detectChanges();
            // Assert
            expect(radioButtonElement.getAttribute('ng-reflect-model')).toBe(gender);
          });
        });
      });

      describe('the age field', () => {
        const key = 'age-0'
        let ageSelectElement: HTMLSelectElement;

        beforeEach(() => {
          ageSelectElement = compiledComponent.querySelector(`#${key}`)!;
        });

        it('should have attribute "name" and the value is "age-0"', () => {
          // Arrange
          const attributeName = 'ng-reflect-name';
          const attributeValue = key;
          // Assert
          expect(ageSelectElement.getAttribute(attributeName)).toBe(attributeValue);
        });

        it('should have attribute "required"', () => {
          // Arrange
          const attributeName = 'required';
          // Assert
          expect(ageSelectElement.hasAttribute(attributeName)).toBe(true);
        });

        it('should binding the value of the insured\'s property "age"', () => {
          // Arrange
          const age = '18';
          // Act
          component.insuredList[0].age = age;
          fixture.detectChanges();
          // Assert
          expect(ageSelectElement.getAttribute('ng-reflect-model')).toBe(age);
        });

        it('should trigger function "insuredAgeChange" when the value be changed', () => {
          // Arrange
          spyOn(component, 'insuredAgeChange');
          const ageNgModel = component.ageNgModelRefList.get(0)!;
          // Act
          ageSelectElement.value = '18';
          ageSelectElement.dispatchEvent(new Event('ngModelChange'));
          // Assert
          expect(component.insuredAgeChange).toHaveBeenCalledWith(ageNgModel.value, ageNgModel.errors, component.insuredList[0]);
        });
      });

      describe('Error Messages', () => {
        it('should binding the value of the insured\'s property "nameErrorMessage" in the template', () => {
          // Arrange
          const insured = component.insuredList[0];
          const errorMessage = 'account error';
          const targetElement = compiledComponent.querySelector('#name-0 + .error-message');
          // Act
          insured.nameErrorMessage = errorMessage;
          fixture.detectChanges();
          // Assert
          expect(targetElement?.textContent).toBe(errorMessage);
        });

        it('should binding the value of the insured\'s property "ageErrorMessage" in the template', () => {
          // Arrange
          const insured = component.insuredList[0];
          const errorMessage = 'password error';
          const targetElement = compiledComponent.querySelector('#age-0 + .error-message');
          // Act
          insured.ageErrorMessage = errorMessage;
          fixture.detectChanges();
          // Assert
          expect(targetElement?.textContent).toBe(errorMessage);
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

      it('should be disabled when "insuredList" is empty array', () => {
        // Assert
        expect(buttonElement.hasAttribute('disabled')).toBe(true);
      });

      xit('should be disabled when there ara any verifying errors that insured\'s data', () => {
        // Arrange
        component.insuredList = [{
          name: 'A',
          gender: '',
          age: '',
          nameErrorMessage: '',
          ageErrorMessage: ''
        }];
        compiledComponent.querySelector('button[type="submit"]')
        // Act
        fixture.detectChanges();
        // Assert
        expect(buttonElement.hasAttribute('disabled')).toBe(true);
      })

      it('should be enabled when there ara any verifying errors that insured\'s data', () => {
        // Arrange
        component.insuredList = [{
          name: 'Leo',
          gender: 'male',
          age: '18',
          nameErrorMessage: '',
          ageErrorMessage: ''
        }];
        // Act
        fixture.detectChanges();
        // Assert
        expect(buttonElement.hasAttribute('disabled')).toBe(false);
      })
    });
  });
});
