import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RequestService } from '../../../auth';

@Injectable()
export class TicketService {
  remoteTickets = new BehaviorSubject([]);

  constructor(http: Http, request: RequestService) {
    this._http = http;
    this._request = request;
  }

  refreshTickets() {
    let ticketsResponse = this._http.get('/tickets')
      .map(res => res.json());

    ticketsResponse.subscribe(
        (tickets) => {
          this.remoteTickets.next(tickets);
        },
        (error) => {
          console.error(error);
        }
      );

    return ticketsResponse;
  }

  addTicket(ticket) {
    return this._http
      .post('/tickets', JSON.stringify(ticket), { headers: this._request.getAuthHeaders() })
      .map(res => res.json());
  }

  getTicket(id) {
    return this._http.get(`/tickets/${id}`)
      .map(res => res.json());
  }

  updateTicket(ticket) {
    return this._http
      .put(`/tickets/${ticket._id}`, JSON.stringify(ticket), { headers: this._request.getAuthHeaders() })
      .map(res => res.json());
  }
}
