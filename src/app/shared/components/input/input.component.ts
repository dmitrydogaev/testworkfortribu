import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'input-component',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input('type') type = 'text'
  @Input('placeholder') placeholder = ''
  @Input('label') label = 'Enter some data'
  @Input('control') control = new FormControl(null);

  isDisabled() {
    return this.control ? this.control.disabled : false;
  }

  hasError() {
    return this.isDisabled() ? true : this.control.valid
  }

  getErrorMsg() {
    const key = Object.keys(this.control.errors)[0];

    if (key !== 'required' && typeof this.control.errors[key] !== 'object')
      return this.control.errors[key];
    else if (this.control.errors[key].requiredLength)
      return `Не более ${this.control.errors[key].requiredLength} знаков`;
  }

  change(value: any){
    if (this.control)
      this.control.setValue(value);
  }
}
