import { Injectable } from  '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { catchError, switchMap, tap } from  'rxjs/operators';
import { Observable, BehaviorSubject, from, of } from  'rxjs';

import { User } from  '../../shared/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage.service';

const ACCESS_TOKEN_KEY = 'my-access-token';
const REFRESH_TOKEN_KEY = 'my-refresh-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken = null;
  url = environment.api_url;
  public user: Observable<any>;
  public profile_id: number;
  public profile_email: string;
  public profile_picture: string;
  public profile_roles: number;
  public profile_firstName: string;
  public profile_lastName: string;
 
  constructor(private http: HttpClient, private router: Router,  private  storage:  StorageService) {
    this.loadToken();
  }
 
  // Load accessToken on startup
  async loadToken() {
    const token = await this.storage.get("ACCESS_TOKEN_KEY");    
    if (token && token.value) {
      this.currentAccessToken = token.value;
      this.isAuthenticated.next(true);
      this.getProfileData();
    } else {
      this.isAuthenticated.next(false);
    }
  }

 
  // Get our secret protected data
  getProfileData() {
    if(this.currentAccessToken!=null){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.currentAccessToken}`
        })
      }
      this.user = this.http.get(`${this.url}/profile`, httpOptions).pipe(
        tap(_ => console.log(`Profile fetched`)),
        catchError(this.handleError<User>(`Get Profile`))
      );

      this.user.subscribe((res) => {
        this.profile_id = res.user.id;
        this.profile_email = res.user.email;
        this.profile_picture = res.user.picture;
        this.profile_roles = res.user.roles;
        this.profile_firstName = res.user.firstName;
        this.profile_lastName = res.user.lastName;
      });
    }
  }

  async getProfileId(){
    this.getProfileData();
    return this.profile_id;
  }

  async getProfileEmail(){
    this.getProfileData();
    return this.profile_email;
  }

  async getProfilePicture(){
    this.getProfileData();
    return this.profile_picture;
  }

  async getProfileRoles(){
    this.getProfileData();
    return this.profile_roles;
  }

  async getProfileFirstName(){
    this.getProfileData();
    return this.profile_firstName;
  }

  async getProfileLastName(){
    this.getProfileData();
    return this.profile_lastName;
  }

  async getCurrentAccessToken(){
    return await this.storage.get("ACCESS_TOKEN_KEY");
  }
 

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
 
  // Create new user
  signUp(credentials: {email, password}): Observable<any> {
    return this.http.post(`${this.url}/users`, credentials);
  }
 
  // Sign in a user and store access and refres token
  login(credentials: {email, password}): Observable<any> {
    return this.http.post(`${this.url}/auth/login`, credentials).pipe(
      switchMap((tokens: {access_token: string, refresh_token: string }) => {

        console.log("TOKEN ACCESS: "+ tokens.access_token);
        console.log("TOKENS REFRESH: "+ tokens.refresh_token);
        this.currentAccessToken = tokens.access_token;
        const storeAccess = this.storage.set("ACCESS_TOKEN_KEY", tokens.access_token);
        const storeRefresh = this.storage.set("REFRESH_TOKEN_KEY", tokens.refresh_token);
        
        this.getProfileData();

        return from(Promise.all([storeAccess, storeRefresh]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }

  logout() {
    this.currentAccessToken = null;
    // Remove all stored tokens
    const deleteAccess = this.storage.remove("ACCESS_TOKEN_KEY");
    const deleteRefresh = this.storage.remove("REFRESH_TOKEN_KEY");
    this.storage.clear();

    this.user = null;
    this.profile_id = null;
    this.profile_email = null;
    this.profile_picture = null;
    this.profile_roles = null;
    this.profile_firstName = null;
    this.profile_lastName = null;
    
    this.router.navigate(['/tabs/home']);
    this.router.navigate(['/tabs/home']);
    this.router.navigate(['/tabs/home']);
    this.isAuthenticated.next(false);

    return from(Promise.all([deleteAccess, deleteRefresh]));
    
  }
  
  // Load the refresh token from storage
  // then attach it as the header for one specific API call
  getNewAccessToken() {
    const refreshToken = from(this.storage.get("REFRESH_TOKEN_KEY"));
    return refreshToken.pipe(
      switchMap(token => {
        if (token) {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            })
          }
          return this.http.get(`${this.url}/auth/refresh`, httpOptions);
        } else {
          // No stored refresh token
          return null;
        }
      })
    );
  }
  
  // Store a new access token
  storeAccessToken(accessToken) {
    this.currentAccessToken = accessToken;
    return from(this.storage.set("ACCESS_TOKEN_KEY", accessToken));
  }

}
