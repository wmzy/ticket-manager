import { Injectable } from '@angular/core';

import { AuthService } from '../../auth';

@Injectable()
export class LoggedInGuard {
  constructor(user: AuthService) {
    this._user = user;
  }

  canActivate() {
    return this._user.isLoggedIn();
  }
}
