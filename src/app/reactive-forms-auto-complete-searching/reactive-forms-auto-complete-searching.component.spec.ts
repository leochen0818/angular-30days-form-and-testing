import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsAutoCompleteSearchingComponent } from './reactive-forms-auto-complete-searching.component';

describe('ReactiveFormsAutoCompleteSearchingComponent', () => {
  let component: ReactiveFormsAutoCompleteSearchingComponent;
  let fixture: ComponentFixture<ReactiveFormsAutoCompleteSearchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormsAutoCompleteSearchingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormsAutoCompleteSearchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
