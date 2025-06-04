import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { AccountRegister } from '../../models/account-register';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  error: string = '';
  confirmMessage : string = '';

  constructor(private accountService: AccountService, router: Router) {}

  createAccount() {
    let newAccount: AccountRegister = {
      username: this.username,
      email: this.email,
      password: this.password
    }

    this.accountService.userRegister(newAccount).subscribe({
      next: response => {
        console.log(response);
        this.confirmMessage = 'Kontot har skapats';
      },
      error: err => {
        this.error = err.error.error;
      }
    });
  }
}
