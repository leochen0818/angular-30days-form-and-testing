import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ReactiveFormsAutoCompleteSearchingService } from './reactive-forms-auto-complete-searching.service';

import { debounceTime, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-reactive-forms-auto-complete-searching',
  templateUrl: './reactive-forms-auto-complete-searching.component.html',
  styleUrls: ['./reactive-forms-auto-complete-searching.component.scss']
})
export class ReactiveFormsAutoCompleteSearchingComponent {

  searchingInputControl = new FormControl();
  stations$ = this.searchingInputControl.valueChanges.pipe(
    startWith(''),
    debounceTime(500),
    switchMap(value => this.service.searchStation(value))
  );

  constructor(private service: ReactiveFormsAutoCompleteSearchingService) { }

}
