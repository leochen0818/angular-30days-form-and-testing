import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { ReactiveFormsAutoCompleteSearchingComponent } from './reactive-forms-auto-complete-searching.component';
import { ReactiveFormsAutoCompleteSearchingService } from './reactive-forms-auto-complete-searching.service';

import { EMPTY, Observable, of } from 'rxjs';

describe('ReactiveFormsAutoCompleteSearchingComponent', () => {
  let component: ReactiveFormsAutoCompleteSearchingComponent;
  let fixture: ComponentFixture<ReactiveFormsAutoCompleteSearchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactiveFormsAutoCompleteSearchingComponent],
      providers: [
        {
          provide: ReactiveFormsAutoCompleteSearchingService,
          useValue: {
            searchStation: () => EMPTY
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormsAutoCompleteSearchingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Property searchingInputControl', () => {
    it('should be a instance of FormControl', () => {
      // Assert
      expect(component.searchingInputControl).toBeInstanceOf(FormControl);
    });
  });

  describe('Property stations$', () => {
    it('should be a instance of FormControl', () => {
      // Assert
      expect(component.stations$).toBeInstanceOf(Observable);
    });

    describe('when it be subscribed', () => {
      let service: ReactiveFormsAutoCompleteSearchingService;
      beforeEach(() => {
        service = TestBed.inject(ReactiveFormsAutoCompleteSearchingService);
        spyOn(service, 'searchStation').and.returnValue(of([]));
      });

      it('should call function "searchStation" of the service with empty string', (done) => {
        // Act
        component.stations$.subscribe(() => {
          // Assert
          expect(service.searchStation).toHaveBeenCalledOnceWith('');
          done();
        });
      });

      describe('when the input value changes', () => {
        it('should call function "searchStation" of the service with the value', (done) => {
          // Arrange
          const value = 'Leo'
          // Act
          component.stations$.subscribe(() => {
            // Assert
            expect(service.searchStation).toHaveBeenCalledOnceWith(value);
            done();
          });
          component.searchingInputControl.patchValue(value);
        });
      });

      describe('when the input value changes twice quickly', () => {
        it('should call function "searchStation" of the service once with the last value', (done) => {
          // Arrange
          const firstValue = 'Leo'
          const secondValue = 'Chen'
          // Act
          component.stations$.subscribe(() => {
            // Assert
            expect(service.searchStation).toHaveBeenCalledOnceWith(secondValue);
            done();
          });
          component.searchingInputControl.patchValue(firstValue);
          component.searchingInputControl.patchValue(secondValue);
        });
      });

      describe('when the input value changes twice slowly', () => {
        it('should call function "searchStation" of the service twice', fakeAsync(() => {
          // Arrange
          const firstValue = 'Leo'
          const secondValue = 'Chen'
          // Act
          component.stations$.subscribe();
          component.searchingInputControl.patchValue(firstValue);
          tick(600);
          component.searchingInputControl.patchValue(secondValue);
          tick(600);
          // Assert
          expect(service.searchStation).toHaveBeenCalledTimes(2);
          expect(service.searchStation).toHaveBeenCalledWith(firstValue);
          expect(service.searchStation).toHaveBeenCalledWith(secondValue);
        }));
      });
    })
  });
});
