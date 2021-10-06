import { TestBed } from '@angular/core/testing';

import { ReactiveFormsAutoCompleteSearchingService } from './reactive-forms-auto-complete-searching.service';

describe('ReactiveFormsAutoCompleteSearchingService', () => {
  let service: ReactiveFormsAutoCompleteSearchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactiveFormsAutoCompleteSearchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
