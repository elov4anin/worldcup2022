import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {AuthLayoutsComponent} from './layouts/auth-layouts/auth-layouts.component';
import {SiteLayoutsComponent} from './layouts/site-layouts/site-layouts.component';
import {HistoryPageComponent} from './pages/history-page/history-page.component';

const appRoutes: Routes = [
  {
    path: '', component: AuthLayoutsComponent, children: [
        {
          path: '', redirectTo: '/index',  pathMatch: 'full'
        },
        {
          path: 'index', component: LoginPageComponent
        }
      ]
    },
    {path: '', component: SiteLayoutsComponent, children: [
        {path: 'history', component: HistoryPageComponent}
      ]}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
