import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { FakeBackend, FAKE_BACKEND_PROVIDERS } from '../../../helpers/fake-backend';
import { StorageService } from '../storage/storage.service';
import { RequestService } from '../request/request.service';

describe('AuthService', () => {
  let subject;
  let backend;
  let storage;
  let credentials = { email: 'user@gmail.com', password: 'super_secret' };
  function successfulHttpLogin() {
    backend.expectPOST('/login', JSON.stringify(credentials))
      .respond(200, JSON.stringify({ success: true, auth_token: 'secret_token' }));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        StorageService,
        RequestService,
        FAKE_BACKEND_PROVIDERS
      ]
    });
  });

  beforeEach(inject([AuthService, StorageService, FakeBackend],
    (authService, storageService, fakeBackend) => {
      subject = authService;
      storage = storageService;
      backend = fakeBackend;

      spyOn(storage, 'setAuthToken');
      spyOn(storage, 'removeAuthToken');
    }
  ));

  it('should log in auth when request was successful', () => {
    successfulHttpLogin();

    subject.login(credentials).subscribe((result) => {
      expect(result).toBeTruthy();
      expect(storage.setAuthToken).toHaveBeenCalledWith('secret_token');
    });

    backend.flush();
  });

  it('should not log in auth when request was unsuccessful', () => {
    backend.expectPOST('/login', JSON.stringify(credentials))
      .respond(200, JSON.stringify({ success: false }));

    subject.login(credentials).subscribe((result) => {
      expect(result).toBeFalsy();
      expect(storage.setAuthToken.calls.count()).toEqual(0);
    });

    backend.flush();
  });

  it('should return current login state', () => {
    successfulHttpLogin();

    subject.login(credentials).subscribe(() => { });
    backend.flush();

    expect(subject.isLoggedIn()).toBeTruthy();
  });

  it('should notify current login state', () => {
    successfulHttpLogin();

    subject.login(credentials).subscribe(() => { });
    backend.flush();

    subject.getLoggedIn().subscribe((loggedIn) => {
      expect(loggedIn).toBeTruthy();
    });
  });

  it('should log out auth', () => {
    subject.logout();

    expect(storage.removeAuthToken).toHaveBeenCalled();
    expect(subject.isLoggedIn()).toBeFalsy();
  });
});
