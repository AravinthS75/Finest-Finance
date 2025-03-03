import { Component, ViewEncapsulation } from '@angular/core';
import { User } from '../../models/user.model';
import { AdminService } from '../../services/admin.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-view-managers',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './admin-view-managers.component.html',
  styleUrl: './admin-view-managers.component.css'
})
export class AdminViewManagersComponent {
   managers: User[] = [];
   managerData: string | null = null;
   token: string = '';
   selectedManager: User | null = null;
   isModalOpen: boolean = false;
   modalState: 'open' | 'closed' = 'closed';
 
   constructor(
     private adminService: AdminService,
     private sanitizer: DomSanitizer
   ) {
     this.managerData = sessionStorage.getItem('authUser');
     if (this.managerData) {
       const userDetails = JSON.parse(this.managerData);
       this.token = userDetails.token;
     } else {
       console.error('No user data found in sessionStorage');
     }
   }
 
   ngOnInit(): void {
     this.adminService.getAllManagers(this.token).subscribe((data) => {
       this.managers = data;
       console.log(this.managers);
     });
   }
 
   getProfileImage(manager: User): SafeStyle {
     if (manager.profilePicture) {
       const style = `url(data:image/jpeg;base64,${manager.profilePicture})`;
       return this.sanitizer.bypassSecurityTrustStyle(style);
     }
     return this.sanitizer.bypassSecurityTrustStyle(`url(assets/images/default-profile.png)`);
   }
   
   openLoanModal(user: User): void {
     this.selectedManager = user;
     this.isModalOpen = true;
     this.modalState = 'open';
     document.body.style.overflow = 'hidden';
   }
   
   closeLoanModal(): void {
     this.isModalOpen = false;
     this.selectedManager = null;
     document.body.style.overflow = '';
     this.modalState = 'closed';
   }
}
