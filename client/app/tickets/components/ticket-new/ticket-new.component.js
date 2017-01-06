import { Component } from '@angular/core';
import { Router } from '@angular/router';

import template from './ticket-new.template.html';
import { TicketService } from '../../services/ticket/ticket.service';

@Component({
  selector: 'ticket-new',
  template: template
})
export class TicketNewComponent {
  constructor(ticketService: TicketService, router: Router) {
    this._ticketService = ticketService;
    this._router = router;
  }

  onSave(ticket) {
    this._ticketService.addTicket(ticket).subscribe(
      () => {
        this._router.navigate(['']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
