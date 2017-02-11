import _ from 'lodash';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

import {StorageService} from '../storage/storage.service';
import {RequestService} from '../request/request.service';

@Injectable()
export class AuthService {

  _loggedIn = new BehaviorSubject(false);
  _info = new BehaviorSubject({});

  constructor(http: Http, storage: StorageService, request: RequestService) {
    this._http = http;
    this._storage = storage;
    this._request = request;

    if (!!this._storage.getAuthToken()) {
      this._loggedIn.next(true);
    }

    this._loggedIn.filter(_.identity).subscribe(this.fetchInfo)
  }

  signUp(info) {
    return this._http
      .post('/api/v1/sign-up', JSON.stringify(info), {headers: this._request.getJsonHeaders()})
      .map(res => res.json())
      .map(({authToken}) => {
        this._storage.setAuthToken(authToken);
        this._loggedIn.next(true);
      });
  }

  login(credentials) {
    return this._http
      .put('/api/v1/login', JSON.stringify(credentials), {headers: this._request.getJsonHeaders()})
      .map(res => res.json())
      .map(({authToken}) => {
        this._storage.setAuthToken(authToken);
        this._loggedIn.next(true);
        return true;
      });
  }

  logout() {
    this._storage.removeAuthToken();
    this._loggedIn.next(false);
  }

  fetchInfo = () => {
    return this._http
      .get('/api/v1/auth-info', {headers: this._request.getAuthHeaders()})
      .map(res => res.json())
      .subscribe(info => this._info.next(info));
  };

  isLoggedIn() {
    return this._loggedIn.getValue();
  }

  getLoggedIn() {
    return this._loggedIn;
  }

  getInfo() {
    return this._info;
  }
}
