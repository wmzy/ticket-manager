import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import template from './user-list-item.template.html';
import {AuthService} from '../../../auth';

@Component({
  selector: 'user-list-item',
  template: template,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListItemComponent {
  @Input() user;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  getLoggedIn() {
    return this.authService.getLoggedIn();
  }
}
