import {StorageService} from './services/storage/storage.service';
import {RequestService} from './services/request/request.service';
import {AuthService} from './services/auth/auth.service';

import {LoginComponent} from './components/login/login.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';

export {
  StorageService,
  RequestService,
  AuthService
};

export const AUTH_PROVIDERS = [StorageService, RequestService, AuthService];
export const AUTH_DECLARATIONS = [LoginComponent, SignUpComponent];
