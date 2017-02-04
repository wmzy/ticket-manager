import {Component, ChangeDetectionStrategy} from '@angular/core';

import template from './user-list.template.html';
import {AuthService} from '../../../auth';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'user-list',
  template: template,
  changeDetection: ChangeDetectionStrategy.Detached
})
export class UserListComponent {
  constructor(userService: UserService, authService: AuthService) {
    this._userService = userService;
    this.authService = authService;
  }

  ngOnInit() {
    this._userService.refreshUsers();
  }

  getRemoteUsers() {
    return this._userService.remoteUsers;
  }
}
