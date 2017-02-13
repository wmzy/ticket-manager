/**
 * Created by bby on 17/2/13.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import template from './ticket-page.template.html';
import {validatorFactory} from '../../validator';

@Component({
  selector: 'ticket-page',
  template: template
})
export class TicketPageComponent {
  @Input() ticketPage;

  constructor(builder: FormBuilder) {
    this._builder = builder;

  }

}
