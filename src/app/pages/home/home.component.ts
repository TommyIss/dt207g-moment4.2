import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { AccountLogin } from '../../models/account-login';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private accountService: AccountService, private router: Router) {}

  logIn() {
    let inLogedAccount: AccountLogin = {
      email: this.email,
      password: this.password
    }

    this.accountService.userLogin(inLogedAccount).subscribe({
      next: (response) => {
        console.log(response.response.token);
        let token = response.response.token;
        localStorage.setItem('authtoken', token);
      },
      error: err => {
        this.error = err.error.error;
      }
    });
  }
}
