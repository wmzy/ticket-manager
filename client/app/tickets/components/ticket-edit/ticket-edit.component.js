import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import template from './ticket-edit.template.html';
import { TicketService } from '../../services/ticket/ticket.service';
import 'rxjs/add/operator/toPromise';

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
    this.ticket = this._ticketService.getTicket(
      this._route.params.getValue().id
    );
  }

  onSave(ticket) {
    ticket._id = this._route.params.getValue().id;

    this._ticketService.updateTicket(ticket).subscribe(
      () => {
        this._router.navigate(['']);
      },
      err => {
        console.error(err);
      }
    );
  }
}
