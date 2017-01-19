import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import template from './login.template.html';
import { AuthService } from '../../services/auth/auth.service';
import { validatorFactory } from '../../../tickets/validator';

@Component({
  selector: 'login',
  template: template
})
export class LoginComponent {

  constructor(authService: AuthService, builder: FormBuilder, router: Router) {
    this._authService = authService;
    this._router = router;

    this.loginForm = builder.group({
      symbol: ['', [Validators.required, validatorFactory('email')]],
      password: ['', Validators.required]
    });
  }

  onSubmit(credentials) {
    this._authService.login(credentials).subscribe((result) => {
      if (result) {
        this._router.navigate(['']);
      }
    });
  }
}
