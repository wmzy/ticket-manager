import { TicketService } from './services/ticket/ticket.service';

import { ShortDescriptionPipe } from './pipes/short-description.pipe';

import { ClickCounterDirective } from './directives/click-counter.directive';

import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TicketEditComponent } from './components/ticket-edit/ticket-edit.component';
import { TicketNewComponent } from './components/ticket-new/ticket-new.component';
import { TicketListItemComponent } from './components/ticket-list-item/ticket-list-item.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';

export {
  TicketService
};

export const TICKETS_PROVIDERS = [TicketService];
export const TICKETS_DECLARATIONS = [
  ShortDescriptionPipe,
  ClickCounterDirective,
  TicketFormComponent,
  TicketEditComponent,
  TicketNewComponent,
  TicketListItemComponent,
  TicketListComponent
];
