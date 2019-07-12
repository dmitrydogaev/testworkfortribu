import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'select-component',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @Input('label') label = 'Enter some data'
  @Input('disabled') disabled = false;
  @Input('data') data = null;
  @Input('control') control = new FormControl(null);

  ngOnChanges(){
    if (this.data && this.control && !this.control.value) {
      this.control.setValue(this.data[0].id);
    }
  }

  isDisabled() {
    return this.disabled === true || this.control ? this.control.disabled : false;
  }

  hasError() {
    return this.isDisabled() ? false : this.control.invalid;
  }

  hasEmptyError(){
    return this.control.hasError('value') && this.control.errors.value === 'empty';
  }

  hasValidityError(){
    return this.control.hasError('value') && this.control.errors.value === 'invalid';
  }

  getAnotherErrorText() {
    const error = this.control.errors[Object.keys(this.control.errors)[0]];

    return typeof error === 'string' ? error : '';
  }

  change(value){
    if (this.control && value && !isNaN(parseInt(value, 10)))
      this.control.setValue(parseInt(value, 10));
  }
}
