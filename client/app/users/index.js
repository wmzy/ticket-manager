import {UserService} from './services/user/user.service';

import {UserListItemComponent} from './components/user-list-item/user-list-item.component';
import {UserListComponent} from './components/user-list/user-list.component';

export {
  UserService
};

export const USERS_PROVIDERS = [UserService];
export const USERS_DECLARATIONS = [
  UserListItemComponent,
  UserListComponent
];
