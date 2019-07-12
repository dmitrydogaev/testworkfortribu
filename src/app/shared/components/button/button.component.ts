import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'button-component',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Output('pressed') clickEvent = new EventEmitter();
  @Input('text') text = 'click me!'; // default button text in case of forgot to override
  @Input('disabled') disabled = false;
  @Input('loading') loading = false;

  click() {
    if (!this.disabled)
      this.clickEvent.emit();
  }
}
