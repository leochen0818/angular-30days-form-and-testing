import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsDateRangeComponent } from './reactive-forms-date-range.component';

describe('ReactiveFormsDateRangeComponent', () => {
  let component: ReactiveFormsDateRangeComponent;
  let fixture: ComponentFixture<ReactiveFormsDateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormsDateRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormsDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
