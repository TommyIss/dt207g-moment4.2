import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountRegister } from '../models/account-register';
import { AccountLogin } from '../models/account-login';
import { LoginResponse } from '../models/login-response';
import { ProtectedData } from '../models/protected-data';

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
  userLogin(accountLogin: AccountLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, accountLogin)
  }

  // Hämta skyddade data
  getProtectedRoute(email: string): Observable<ProtectedData> {
    let token = localStorage.getItem('authtoken');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<ProtectedData>(`${this.url}/protected/${email}`, { headers }).pipe(
      catchError(error => {
        console.error('Fel vid hämtning av data:', error)
        return throwError(() => { new Error('Åtkomst nekad')});
      })
    );
  }
}
