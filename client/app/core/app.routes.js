import { TicketListComponent } from '../tickets/components/ticket-list/ticket-list.component';
import { TicketNewComponent } from '../tickets/components/ticket-new/ticket-new.component';
import { TicketEditComponent } from '../tickets/components/ticket-edit/ticket-edit.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { SignUpComponent } from '../auth/components/sign-up/sign-up.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';

export const routes = [
  { path: '', component: TicketListComponent, pathMatch: 'full' },
  { path: 'new', component: TicketNewComponent, canActivate: [LoggedInGuard] },
  { path: 'edit/:id', component: TicketEditComponent, canActivate: [LoggedInGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'join', component: SignUpComponent, canActivate: [LoggedOutGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] }
];
