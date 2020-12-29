import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './helpers/auth.guard';

const accountModule = () => import('./components/account/account.module').then(x => x.AccountModule);
const sitesModule = () => import('./components/sites/sites.module').then(x => x.SitesModule);
const usersModule = () => import('./components/users/users.module').then(x => x.UsersModule);
const subscriptionsModule = () => import('./components/subscriptions/subscriptions.module').then(x => x.SubscriptionsModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'sites', loadChildren: sitesModule, canActivate: [AuthGuard] },
  { path: 'subscriptions', loadChildren: subscriptionsModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
