import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResult } from './login-result';
import { environment } from '../environments/environment';
import { UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public tokenKey: string = "tokenKey";
  private _authStatus = new BehaviorSubject<boolean>(false); 
  public authStatus = this._authStatus.asObservable();
  
  init() : void {
    if (this.isAuthenticated())
      this.setAuthStatus(true);
  }
  isAuthenticated() : boolean {
    return this.getToken() !== null;
  }
  constructor(protected http:HttpClient) { }
  login(item: LoginRequest): Observable<LoginResult>{
    let url = `${environment.baseUrl}api/Admin/Login`;
    return this.http.post<LoginResult>(url, item)
    .pipe(tap(loginResult => {
      if(loginResult.success){
        localStorage.setItem(this.tokenKey, loginResult.token);
        this.setAuthStatus(true);
      }
    }));
  }
  getToken():string | null {
    return localStorage.getItem(this.tokenKey);
  }
  private setAuthStatus(isAuthenticated: boolean): void{
    this._authStatus.next(isAuthenticated);
  }
  logout(): void{
    localStorage.removeItem(this.tokenKey);
    this.setAuthStatus(false);
  }
}
