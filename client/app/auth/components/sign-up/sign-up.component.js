import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import template from './sign-up.template.html';
import {AuthService} from '../../services/auth/auth.service';
import {validatorFactory} from '../../../tickets/validator';

@Component({
  selector: 'sign-up',
  template: template
})
export class SignUpComponent {

  constructor(authService: AuthService, builder: FormBuilder, router: Router) {
    this._authService = authService;
    this._router = router;

    this.signUpForm = builder.group({
      username: ['', [Validators.required]],
      nick: ['', [Validators.required]],
      mobile: ['', []],
      email: ['', [Validators.required, validatorFactory('email')]],
      password: ['', Validators.required],
      conformPassword: ['', Validators.required]
    });
  }

  onSubmit(credentials) {
    this._authService.signUp(credentials).subscribe((result) => {
      this._router.navigate(['']);
    });
  }
}
