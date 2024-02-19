import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'https://auth-task-node.onrender.com/api';

  constructor(private http: HttpClient, private router: Router) {}

  signUp(user: any) {
    return this.http.post<any>(`${this.URL}/signup`, user);
  }
  signIn(user: any) {
    return this.http.post<any>(`${this.URL}/signin`, user);
  }

  checkUserExists(email: string): Observable<any> {
    const url = `${this.URL}/checkUserExists`;
    return this.http.post(url, { email });
  }

  loggedIn(): Observable<boolean> {
    return of(!!localStorage.getItem('token'));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }





}
