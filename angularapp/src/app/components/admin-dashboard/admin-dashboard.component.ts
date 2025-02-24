import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
    user?: User;
    error: string = '';
    userDetailsAvailable: boolean = false;
    userData: string | null = null;
    userId: number = 0;
    token: string = '';

    constructor(private userService: UserService, private userStoreService: UserStoreService) {
      this.userData = sessionStorage.getItem('authUser');
    
      if (this.userData) {
        const userDetails = JSON.parse(this.userData);
        this.userId = userDetails.userId;
        this.token = userDetails.token;
      } else {
        console.error('No user data found in sessionStorage');
      }
    }    

    ngOnInit(): void {
        if (this.userId) {
            this.getUserDetails(this.userId, this.token);
        } else {
            console.error('User email is null or undefined');
        }
    }

    getUserDetails(userId: number, token: string): void {
        this.userService.getAdminDetails(userId, token).subscribe(
            (data) => {
                this.user = data;
                this.userDetailsAvailable = true;
            },
            (errorResponse: HttpErrorResponse) => {
                this.userDetailsAvailable = false;
                this.error = errorResponse.error;
            }
        );
    }
}
