import { Component, ChangeDetectionStrategy } from '@angular/core';

import template from './ticket-list.template.html';
import { AuthService } from '../../../auth';
import { TicketService } from '../../services/ticket/ticket.service';

@Component({
  selector: 'ticket-list',
  template: template,
  changeDetection: ChangeDetectionStrategy.Detached
})
export class TicketListComponent {
  constructor(ticketService: TicketService, authService: AuthService) {
    this._ticketService = ticketService;
    this.authService = authService;
  }

  ngOnInit() {
    this._ticketService.refreshTickets();
  }

  getRemoteTickets() {
    return this._ticketService.remoteTickets;
  }
}
