import { Component, ChangeDetectionStrategy } from '@angular/core';

import template from './ticket-list.template.html';
import { UserService } from '../../../auth';
import { TicketService } from '../../services/ticket/ticket.service';

@Component({
  selector: 'ticket-list',
  template: template,
  changeDetection: ChangeDetectionStrategy.Detached
})
export class TicketListComponent {
  constructor(ticketService: TicketService, userService: UserService) {
    this._ticketService = ticketService;
    this.userService = userService;
  }

  ngOnInit() {
    this._ticketService.refreshTickets();
  }

  getRemoteTickets() {
    return this._ticketService.remoteTickets;
  }
}
