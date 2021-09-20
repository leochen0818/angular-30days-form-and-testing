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
