import './shim';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {enableProdMode, NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from 'ng2-translate';

import {routes} from './app/core/app.routes';
import {CORE_PROVIDERS, CORE_DECLARATIONS, AppComponent} from './app/core';
import {AUTH_PROVIDERS, AUTH_DECLARATIONS} from './app/auth';
import {TICKETS_PROVIDERS, TICKETS_DECLARATIONS} from './app/tickets';
import {USERS_PROVIDERS, USERS_DECLARATIONS} from './app/users';

if (ENVIRONMENT === 'production') {
  enableProdMode();
}

@NgModule({
  declarations: [CORE_DECLARATIONS, AUTH_DECLARATIONS, TICKETS_DECLARATIONS, USERS_DECLARATIONS],
  imports: [
    HttpModule, BrowserModule, FormsModule, ReactiveFormsModule,
    TranslateModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    CORE_PROVIDERS, AUTH_PROVIDERS, TICKETS_PROVIDERS, USERS_PROVIDERS,
    {provide: 'ENVIRONMENT', useValue: ENVIRONMENT}
  ],
  bootstrap: [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
