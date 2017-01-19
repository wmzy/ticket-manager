import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {RequestService} from '../../../auth';

@Injectable()
export class TicketService {
  remoteTickets = new BehaviorSubject([]);

  constructor(http: Http, request: RequestService) {
    this._http = http;
    this._request = request;
  }

  refreshTickets() {
    let ticketsResponse = this._http.get('/api/v1/tickets', {headers: this._request.getAuthHeaders()})
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
      .post('/api/v1/tickets', JSON.stringify(ticket), {headers: this._request.getAuthHeaders()})
      .map(res => res.json());
  }

  getTicket(id) {
    return this._http.get(`/api/v1/tickets/${id}`, {headers: this._request.getAuthHeaders()})
      .map(res => res.json());
  }

  updateTicket(ticket) {
    return this._http
      .put(`/api/v1/tickets/${ticket._id}`, JSON.stringify(ticket), {headers: this._request.getAuthHeaders()})
      .map(res => res.json());
  }
}
