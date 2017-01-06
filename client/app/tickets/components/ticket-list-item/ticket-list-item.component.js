import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import template from './ticket-list-item.template.html';
import { UserService } from '../../../auth';

@Component({
  selector: 'ticket-list-item',
  template: template,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListItemComponent {
  @Input() ticket;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getLoggedIn() {
    return this.userService.getLoggedIn();
  }
}
