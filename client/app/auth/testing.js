import { Observable } from 'rxjs/Observable';
import { AuthService } from './services/auth/auth.service';

class AuthServiceMock {
  login() {
    return Observable.of(true);
  }

  logout() {}

  isLoggedIn() {
    return true;
  }

  getLoggedIn() {
    return Observable.of(true);
  }
}

const AUTH_TESTING_PROVIDERS = [
  { provide: AuthService, useClass: AuthServiceMock }
];

export {
  AuthServiceMock,
  AUTH_TESTING_PROVIDERS
};
