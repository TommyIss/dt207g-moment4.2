import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProtectedData } from '../../models/protected-data';

@Component({
  selector: 'app-account',
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  // Properties
  id: string = ''; 
  username: string = '';
  email: string = '';
  created: string = '';
  protectedData: ProtectedData = {
    result: {
    _id: this.id,
    username: this.username,
    email: this.email,
    created: this.created
    }
  } 
  error: string = '';
  isVisable: string = 'none';


  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.email = String(this.route.snapshot.paramMap.get('email'));
    this.accountService.getProtectedRoute(this.email).subscribe({
      next: response => {
        this.protectedData = response;
        console.log(this.protectedData.result);
        },
      error: err => {
        this.error = err.error.message;
      }
    });
  }
  getProtectedData() {
    
        if(this.isVisable === 'none'){
          this.isVisable = 'block';
        } else {
          this.isVisable = 'none';
        }
  }
  logOut() {
    localStorage.removeItem('authtoken');
    this.router.navigate(['/']);
  }
}
