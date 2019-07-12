import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services';

@Component({
  selector: 'dashbord-page',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ){
    
  }
  
  logout() {
    this.userService.logout();
    this.router.navigateByUrl('auth/login');
  }
}
