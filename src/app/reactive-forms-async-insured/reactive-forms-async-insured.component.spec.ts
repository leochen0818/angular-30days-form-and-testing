import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsAsyncInsuredComponent } from './reactive-forms-async-insured.component';

describe('ReactiveFormsAsyncInsuredComponent', () => {
  let component: ReactiveFormsAsyncInsuredComponent;
  let fixture: ComponentFixture<ReactiveFormsAsyncInsuredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormsAsyncInsuredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormsAsyncInsuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
