import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import template from './sign-up.template.html';
import {UserService} from '../../services/user/user.service';
import {validatorFactory} from '../../../tickets/validator';

@Component({
  selector: 'sign-up',
  template: template
})
export class signUpComponent {

  constructor(userService: UserService, builder: FormBuilder, router: Router) {
    this._userService = userService;
    this._router = router;

    this.signUpForm = builder.group({
      username: ['', [Validators.required]],
      nick: ['', [Validators.required]],
      mobile: ['', []],
      email: ['', [Validators.required, validatorFactory('email')]],
      password: ['', Validators.required]
    });
  }

  onSubmit(credentials) {
    this._userService.signUp(credentials).subscribe((result) => {
      this._router.navigate(['']);
    });
  }
}
