import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import template from './ticket-form.template.html';
import {validatorFactory} from '../../validator';

import {UserService} from './../../../users/services/user/user.service';
@Component({
  selector: 'ticket-form',
  template: template
})
export class TicketFormComponent {
  @Input() ticket;

  @Output() saved = new EventEmitter();

  constructor(builder: FormBuilder, userService: UserService) {
    this._builder = builder;
    this._userService = userService;

    this.ticketForm = this._builder.group({
      _id: [''],
      title: ['', Validators.required],
      assignee: [''],
      priority: ['medium'],
      content: [''],
      attachments: ['']
    });
  }

  ngOnInit(){
    this.assignee = this._userService.getAssignee();
  }
  ngOnChanges(change) {
    if (change.ticket && change.ticket.currentValue) {
      ['_id', 'title', 'assignee', 'priority', 'content', 'attachments']
        .forEach(k => this.ticketForm.controls[k].setValue(change.ticket.currentValue[k]));
    }
  }

  onSubmit(validTicket) {
    console.log(validTicket)
    this.saved.emit(validTicket);
  }
}
