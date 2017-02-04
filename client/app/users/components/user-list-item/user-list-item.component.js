import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import template from './user-list-item.template.html';
import {AuthService} from '../../../auth';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'user-list-item',
  template: template,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListItemComponent {
  @Input() user;

  constructor(userService: UserService, authService: AuthService) {
    this.userService = userService;
    this.authService = authService;
  }

  getLoggedIn() {
    return this.authService.getLoggedIn();
  }

  setRole(role) {
    this.userService.setRole(this.user._id, role);
    this.userService.refreshUsers();
  }
}
