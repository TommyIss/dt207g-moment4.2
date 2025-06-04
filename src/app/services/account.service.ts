import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AccountRegister } from '../models/account-register';
import { AccountLogin } from '../models/account-login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // Properties
  url: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  // Metoder
  // Registrering
  userRegister(newAccount: AccountRegister): Observable<AccountRegister> {
    return this.http.post<AccountRegister>(`${this.url}/register`, newAccount);
  }

  // Inloggning
  userLogin(accountLogin: AccountLogin): Observable<AccountLogin> {
    return this.http.post<AccountLogin>(`${this.url}/login`, accountLogin)
  }
}
