import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { RequestMethod, Headers } from '@angular/http';
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';

import { TicketService } from './ticket.service';

import { AUTH_PROVIDERS, RequestService } from '../../../auth';

describe('TicketService', () => {
  let service;
  let backend;
  let singleTicket = { _id: 'asdgre', name: 'Angular', website: 'http://angular.io' };
  let ticketsResponse = [singleTicket];

  function returnsResponse(response, method, url, body, headers) {
    backend.connections.subscribe(connection => {
      expect(connection.request.url).toEqual(url);
      expect(connection.request.method).toEqual(method);

      if (body) {
        expect(connection.request.text()).toEqual(body);
      }

      if (headers) {
        for (let header in headers) {
          if (headers.hasOwnProperty(header)) {
            expect(connection.request.headers.get(header)).toEqual(headers[header]);
          }
        }
      }

      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(response)
      })));
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TicketService,
        MockBackend,
        BaseRequestOptions,
        AUTH_PROVIDERS,
        {
          provide: Http,
          useFactory: (mokcBackend, defaultOptions) => {
            return new Http(mokcBackend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer secretToken');

    spyOn(RequestService.prototype, 'getAuthHeaders').and.returnValue(headers);
  });

  beforeEach(inject([TicketService, MockBackend], (ticketService, mockBackend) => {
    service = ticketService;
    backend = mockBackend;
  }));

  it('should refresh remote tickets', () => {
    returnsResponse(ticketsResponse, RequestMethod.Get, '/tickets');

    service.remoteTickets.subscribe((tickets) => {
      if (tickets.length) {
        expect(tickets).toEqual(ticketsResponse);
      }
    });

    service.refreshTickets();
  });

  it('should return tickets got in response', () => {
    returnsResponse(ticketsResponse, RequestMethod.Get, '/tickets');

    service.refreshTickets().subscribe((tickets) => {
      expect(tickets).toEqual(ticketsResponse);
    });
  });

  it('should return ticket', () => {
    returnsResponse(singleTicket, RequestMethod.Get, `/tickets/${singleTicket._id}`);

    service.getTicket(singleTicket._id).subscribe((ticket) => {
      expect(ticket).toEqual(singleTicket);
    });
  });

  it('should add ticket', () => {
    returnsResponse(singleTicket, RequestMethod.Ticket, '/ticket', JSON.stringify(singleTicket), {
      'Content-Type': 'application/json', Authorization: 'Bearer secretToken'
    });

    service.addTicket(singleTicket).subscribe((ticket) => {
      expect(ticket).toEqual(singleTicket);
      expect(RequestService.prototype.getAuthHeaders).toHaveBeenCalled();
    });
  });

  it('should update ticket', () => {
    returnsResponse(singleTicket, RequestMethod.Ticket, `/tickets/${singleTicket._id}`, JSON.stringify(singleTicket), {
      'Content-Type': 'application/json', Authorization: 'Bearer secretToken'
    });

    service.updateTicket(singleTicket).subscribe((ticket) => {
      expect(ticket).toEqual(singleTicket);
      expect(RequestService.prototype.getAuthHeaders).toHaveBeenCalled();
    });
  });
});
