import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms-async-insured',
  templateUrl: './reactive-forms-async-insured.component.html',
  styleUrls: ['./reactive-forms-async-insured.component.scss']
})
export class ReactiveFormsAsyncInsuredComponent implements OnInit {

  /**
   * 綁定在表單上
   *
   * @type {(FormGroup | undefined)}
   * @memberof ReactiveFormsAsyncInsuredComponent
   */
  formGroup: FormGroup | undefined;

  /**
   *  用以取得 FormArray
   *
   * @readonly
   * @type {FormArray}
   * @memberof ReactiveFormsAsyncInsuredComponent
   */
  get formArray(): FormArray {
    return this.formGroup?.get('insuredList')! as FormArray;
  }

  /**
   * 綁定在送出按鈕上，判斷表單是不是無效
   *
   * @readonly
   * @type {boolean}
   * @memberof ReactiveFormsAsyncInsuredComponent
   */
  get isFormInvalid(): boolean {
    return this.formArray.controls.length === 0 || this.formGroup!.invalid;
  }

  /**
   * 透過 DI 取得 FromBuilder 物件，用以建立表單
   *
   * @param {FormBuilder} formBuilder
   * @memberof ReactiveFormsAsyncInsuredComponent
   */
  constructor(private formBuilder: FormBuilder) {}

  /**
   * 當 Component 初始化的時候初始化表單
   *
   * @memberof ReactiveFormsAsyncInsuredComponent
   */
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      insuredList: this.formBuilder.array([])
    });
  }

  /**
   * 新增被保人
   *
   * @memberof ReactiveFormsAsyncInsuredComponent
   */
  addInsured(): void {
    const formGroup = this.createInsuredFormGroup();
    this.formArray.push(formGroup);
  }

  /**
   * 刪除被保人
   *
   * @param {number} index
   * @memberof ReactiveFormsAsyncInsuredComponent
   */
  deleteInsured(index: number): void {
    this.formArray.removeAt(index);
  }

  /**
   * 送出表單
   *
   * @memberof ReactiveFormsAsyncInsuredComponent
   */
  submit(): void {
    // do login...
  }

  /**
   * 透過欄位的 Errors 來取得對應的錯誤訊息
   *
   * @param {string} key
   * @param {number} index
   * @return {*}  {string}
   * @memberof ReactiveFormsAsyncInsuredComponent
   */
  getErrorMessage(key: string, index: number): string {
    const formGroup = this.formArray.controls[index];
    const formControl = formGroup.get(key);
    let errorMessage: string;
    if (!formControl || !formControl.errors || formControl.pristine) {
      errorMessage = '';
    } else if (formControl.errors.required) {
      errorMessage = '此欄位必填';
    } else if (formControl.errors.minlength) {
      errorMessage = '姓名至少需兩個字以上';
    } else if (formControl.errors.maxlength) {
      errorMessage = '姓名至多只能輸入十個字';
    } else if (formControl.errors.pattern) {
      errorMessage = '手機號碼格式錯誤';
    } else if (formControl.errors.email) {
      errorMessage = 'E-mail 格式錯誤';
    }
    return errorMessage!;
  }

  /**
   * 建立被保人的表單
   *
   * @private
   * @return {*}  {FormGroup}
   * @memberof ReactiveFormsAsyncInsuredComponent
   */
  private createInsuredFormGroup(): FormGroup {
    const contactInfoTypeControl = this.formBuilder.control('', Validators.required);
    const contactInfoControl = this.formBuilder.control('', Validators.required);
    contactInfoTypeControl.valueChanges.subscribe((value) => {
      switch (value) {
        case 'mobile':
          contactInfoControl.setValidators([Validators.required, Validators.pattern(/^09\d{8}$/)]);
          break;
        case 'email':
          contactInfoControl.setValidators([Validators.required, Validators.email]);
          break;
        default:
          contactInfoControl.setValidators([Validators.required]);
          break;
      }
      contactInfoControl.updateValueAndValidity();
    });

    return this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(10)]
      ],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      contactInfoType: contactInfoTypeControl,
      contactInfo: contactInfoControl
    });
  }
}
