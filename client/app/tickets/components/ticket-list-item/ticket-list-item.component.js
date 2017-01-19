import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import template from './ticket-list-item.template.html';
import { AuthService } from '../../../auth';

@Component({
  selector: 'ticket-list-item',
  template: template,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListItemComponent {
  @Input() ticket;

  constructor(userService: AuthService) {
    this.userService = userService;
  }

  getLoggedIn() {
    return this.userService.getLoggedIn();
  }
}
