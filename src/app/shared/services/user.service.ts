import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { Role, LoginData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	private loggedIn = this.load();

	constructor(private api: ApiService) { }
	
	clear() {
		localStorage.clear();
	}

	save() {
		localStorage.setItem('logged', 'true');
	}

	load() {
		return !!localStorage.getItem('logged');
	}

	isLoggedIn(): Promise<boolean> { // Promise in case if login check needs to be performed by server
		return Promise.resolve(this.loggedIn);
	}

	logout() {
		this.loggedIn = false;
		this.clear();
	}

	login(data: LoginData) {
		return this.api.post('login', data)
			.then( result => {
				this.loggedIn = true;
				this.save();
			})
			// .catch()
	}

	getRoles(): Promise<Role[]> {
		return this.api.get('roles');
	}

}
