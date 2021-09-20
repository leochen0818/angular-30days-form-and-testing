import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForm, NgModel, ValidationErrors } from '@angular/forms';

import { Insured } from './insured.type';

@Component({
  selector: 'app-template-driven-forms-async-insured',
  templateUrl: './template-driven-forms-async-insured.component.html',
  styleUrls: ['./template-driven-forms-async-insured.component.scss']
})
export class TemplateDrivenFormsAsyncInsuredComponent {
  @ViewChildren('nameNgModel') nameNgModelRefList!: QueryList<NgModel>;
  @ViewChildren('ageNgModel') ageNgModelRefList!: QueryList<NgModel>;

  @ViewChild('form') form!: NgForm;

  // 被保險人清單
  insuredList: Insured[] = [];

  /**
   * 根據索引來重新渲染有更改的節點
   * 詳情請參考官方文件：https://angular.tw/api/common/NgForOf
   *
   * @param {string} index
   * @return {*}  {number}
   * @memberof AppComponent
   */
   trackByIndex(index: number): number {
    return index;
  }

  /**
   * 綁定在姓名欄位上，當使用者改變被保險人的姓名時，會觸發此函式，並取得對應的錯誤訊息
   *
   * @param {string} name
   * @param {ValidationErrors | null} errors
   * @param {Insured} insured
   * @memberof TemplateDrivenFormsAsyncInsuredComponent
   */
  insuredNameChange(name: string, errors: ValidationErrors | null, insured: Insured): void {
    insured.name = name;
    insured.nameErrorMessage = this.getErrorMessage(errors);
  }

  /**
   * 綁定在年齡欄位上，當使用者改變被保險人的年齡時，會觸發此函式，並取得對應的錯誤訊息
   *
   * @param {string} age
   * @param {ValidationErrors | null} errors
   * @param {Insured} insured
   * @memberof TemplateDrivenFormsAsyncInsuredComponent
   */
   insuredAgeChange(age: string, errors: ValidationErrors | null, insured: Insured): void {
    insured.age = age;
    insured.ageErrorMessage = this.getErrorMessage(errors);
  }

  /**
   * 新增被保險人
   *
   * @memberof TemplateDrivenFormsAsyncInsuredComponent
   */
  addInsured(): void {
    const insured: Insured = {
      name: '',
      gender: '',
      age: '',
      nameErrorMessage: '',
      ageErrorMessage: ''
    };
    this.insuredList.push(insured);
  }

  /**
   * 刪除被保險人
   *
   * @param {number} index
   * @memberof TemplateDrivenFormsAsyncInsuredComponent
   */
  deleteInsured(index: number): void {
    this.insuredList.splice(index, 1);
  }

  /**
   * 根據 FormControl 的 errors 屬性取得相應的錯誤訊息
   *
   * @private
   * @param {ValidationErrors | null} errors - FormControl 的 errors
   * @return {*}  {string}
   * @memberof TemplateDrivenFormsAsyncInsuredComponent
   */
  private getErrorMessage(errors: ValidationErrors | null): string {
    let errorMessage = '';
    if (errors?.required) {
      errorMessage = '此欄位必填';
    } else if (errors?.minlength) {
      errorMessage = '姓名至少需兩個字以上';
    }
    return errorMessage;
  }
}
