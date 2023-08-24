import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  protected flag = true;

  @Input() msg = '';

  hide() {
    this.flag = false;
  }
}
