import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';

import template from './menu.template.html';
import {AuthService} from '../../../auth';

@Component({
  selector: 'top-menu',
  template: template,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this._router = router;
  }

  getLoggedIn() {
    return this.authService.getLoggedIn();
  }

  logout() {
    this.authService.logout();
    this._router.navigate(['']);
    return false;
  }
}
