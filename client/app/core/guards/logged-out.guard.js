import { Injectable } from '@angular/core';

import { AuthService } from '../../auth';

@Injectable()
export class LoggedOutGuard {
  constructor(auth: AuthService) {
    this._auth = auth;
  }

  canActivate() {
    return !this._auth.isLoggedIn();
  }
}
