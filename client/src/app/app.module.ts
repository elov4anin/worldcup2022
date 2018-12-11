import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {AuthLayoutsComponent} from './layouts/auth-layouts/auth-layouts.component';
import {SiteLayoutsComponent} from './layouts/site-layouts/site-layouts.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './shared/classes/token.interceptor';
import {HistoryPageComponent} from './pages/history-page/history-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { HistoryListComponent } from './pages/history-page/history-list/history-list.component';
import { HistoryFilterComponent } from './pages/history-page/history-filter/history-filter.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {CountdownTimerModule} from 'ngx-countdown-timer';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutsComponent,
    SiteLayoutsComponent,
    HistoryPageComponent,
    LoaderComponent,
    HistoryListComponent,
    HistoryFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    CountdownTimerModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
