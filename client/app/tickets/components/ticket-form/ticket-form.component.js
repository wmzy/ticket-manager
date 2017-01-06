import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import template from './ticket-form.template.html';
import { validatorFactory } from '../../validator';

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
      _id: [''],
      name: ['', Validators.required],
      website: ['', [Validators.required, validatorFactory('url')]],
      description: ['']
    });
  }

  ngOnChanges(change) {
    if (change.ticket && change.ticket.currentValue) {
      this.ticketForm.controls['_id'].setValue(change.ticket.currentValue._id);
      this.ticketForm.controls['name'].setValue(change.ticket.currentValue.name);
      this.ticketForm.controls['website'].setValue(change.ticket.currentValue.website);
      this.ticketForm.controls['description'].setValue(change.ticket.currentValue.description);
    }
  }

  onSubmit(validTicket) {
    this.saved.emit(validTicket);
  }
}
