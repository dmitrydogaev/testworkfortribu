import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {

	constructor(
		private user: UserService,
		private router: Router
	) {
	}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean{
        return this.checkAuth(next).then(result => {
            if (!result && state.url !== '/auth/login') {
                this.router.navigate(['auth/login']);
            } else if (result && state.url === '/auth/login') {
                this.router.navigate(['dashbord']);
            }

            return true;
        });
    }

	checkAuth(next: ActivatedRouteSnapshot): Promise<any> {
		return this.user.isLoggedIn()
            .then( logged => {
                return logged;
            })
            .catch(() => {
                return false;
            });
	}
}
