/**
 * Created by bby on 17/2/13.
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';

import template from './ticket.template.html';
import { AuthService } from '../../../auth';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../services/ticket/ticket.service';

@Component({
  selector: 'ticket',
  template: template,
  changeDetection: ChangeDetectionStrategy.Detached
})
export class TicketComponent {
  constructor(ticketService: TicketService, authService: AuthService, router: Router, route: ActivatedRoute) {
    this._ticketService = ticketService;
    this.authService = authService;
    this._router = router;
    this._route = route;
    this.ticket = {title:'333'}
  }

  ngOnInit() {
    this.ticket = this._route.params
      .map(params => params.id)
      .mergeMap((id) => {
        return this._ticketService.getTicket(id);
      });
  }
}
