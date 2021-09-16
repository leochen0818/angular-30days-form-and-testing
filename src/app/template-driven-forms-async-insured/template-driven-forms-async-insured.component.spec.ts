import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDrivenFormsAsyncInsuredComponent } from './template-driven-forms-async-insured.component';

describe('TemplateDrivenFormsAsyncInsuredComponent', () => {
  let component: TemplateDrivenFormsAsyncInsuredComponent;
  let fixture: ComponentFixture<TemplateDrivenFormsAsyncInsuredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateDrivenFormsAsyncInsuredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDrivenFormsAsyncInsuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
