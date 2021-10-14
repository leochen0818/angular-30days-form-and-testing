import { ControlContainer, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss']
})
export class AddressInfoComponent {

  get formGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  constructor(private controlContainer: ControlContainer) { }

}
