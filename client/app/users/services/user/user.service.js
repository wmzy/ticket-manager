import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {RequestService} from '../../../auth';

@Injectable()
export class UserService {
  remoteUsers = new BehaviorSubject([]);

  constructor(http: Http, request: RequestService) {
    this._http = http;
    this._request = request;
  }

  refreshUsers() {
    let usersResponse = this._http.get('/api/v1/users', {headers: this._request.getAuthHeaders()})
      .map(res => res.json());

    usersResponse.subscribe(
      (users) => {
        this.remoteUsers.next(users);
      },
      (error) => {
        console.error(error);
      }
    );

    return usersResponse;
  }

  addUser(user) {
    return this._http
      .post('/api/v1/users', JSON.stringify(user), {headers: this._request.getAuthHeaders()})
      .map(res => res.json());
  }

  getUser(id) {
    return this._http.get(`/api/v1/users/${id}`, {headers: this._request.getAuthHeaders()})
      .map(res => res.json());
  }

  updateUser(user) {
    return this._http
      .put(`/api/v1/users/${user._id}`, JSON.stringify(user), {headers: this._request.getAuthHeaders()})
      .map(res => res.json());
  }

  setRole(id, role) {
    return this._http
      .put(`/api/v1/users/${id}/role`, JSON.stringify({role: role}), {headers: this._request.getAuthHeaders()})
      .map(res => res.json());
  }
}
