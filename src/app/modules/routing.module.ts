import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizedGuard } from '../guards/auth.guard';
import {
    LoginComponent,
    DashbordComponent
} from '../pages';

const routes: Routes = [
	{
        path: '*',
        redirectTo: 'auth/login'
	},
	{
		path: 'auth/login',
		canActivate: [AuthorizedGuard],
		component: LoginComponent,
    },
    {
        path: 'dashbord',
        canActivate: [AuthorizedGuard],
		component: DashbordComponent
	},
	{
        path: '**',
        redirectTo: 'auth/login'
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
