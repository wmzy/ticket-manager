import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import template from './ticket-edit.template.html';
import { TicketService } from '../../services/ticket/ticket.service';

@Component({
  selector: 'ticket-edit',
  template: template
})
export class TicketEditComponent {
  constructor(ticketService: TicketService, route: ActivatedRoute, router: Router) {
    this._ticketService = ticketService;
    this._route = route;
    this._router = router;
  }

  ngOnInit() {
    this.ticket = this._route.params
      .map(params => params.id)
      .mergeMap((id) => {
        return this._ticketService.getTicket(id);
      });
  }

  onSave(ticket) {
    this._ticketService.updateTicket(ticket).subscribe(
      () => {
        this._router.navigate(['']);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
