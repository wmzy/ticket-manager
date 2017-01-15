import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import template from './ticket-form.template.html';
import {validatorFactory} from '../../validator';

@Component({
  selector: 'ticket-form',
  template: template
})
export class TicketFormComponent {
  @Input() ticket;

  @Output() saved = new EventEmitter();

  constructor(builder: FormBuilder) {
    this._builder = builder;

    this.ticketForm = this._builder.group({
      id: [''],
      title: ['', Validators.required],
      assignee: [''],
      priority: ['medium'],
      content: [''],
      attachments: ['']
    });
  }

  ngOnChanges(change) {
    if (change.ticket && change.ticket.currentValue) {
      ['id', 'title', 'assignee', 'priority', 'content', 'attachments']
        .forEach(k => this.ticketForm.controls[k].setValue(change.ticket.currentValue[k]));
    }
  }

  onSubmit(validTicket) {
    this.saved.emit(validTicket);
  }
}
