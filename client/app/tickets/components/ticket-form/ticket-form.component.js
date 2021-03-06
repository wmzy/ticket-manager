import _ from 'lodash';
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
      title: ['', Validators.required],
      assignee: ['select'],
      priority: ['medium'],
      content: [''],
      attachments: this._builder.array([])
    });
  }

  ngOnInit() {
    this.assignee = this._userService.getAssignee();
  }

  ngOnChanges(change) {
    if (change.ticket && change.ticket.currentValue) {
      ['title', 'priority', 'content', 'attachments']
        .forEach(k => this.ticketForm.controls[k].setValue(change.ticket.currentValue[k]));
      this.ticketForm.controls['assignee'].setValue(_.get(change.ticket.currentValue, 'assignee._id'));
    }
  }

  onSubmit(validTicket) {
    this.saved.emit(validTicket);
  }
}
