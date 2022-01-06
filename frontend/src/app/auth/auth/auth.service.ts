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

const PROFILE_ID = 'my-profile-id';
const PROFILE_EMAIL = 'my-profile-email';
const PROFILE_PICTURE = 'my-profile-picture';
const PROFILE_ROLE = 'my-profile-role';
const PROFILE_USERNAME = 'my-profile-username';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken = null;
  url = environment.api_url;
  public user: Observable<any>;;
 
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
      console.log("got user: " + res.user.username)
      console.log(res)
      const storeId = this.storage.set("PROFILE_ID", res.user.id);
      const storeEmail = this.storage.set("PROFILE_EMAIL", res.user.email);
      const storePicture = this.storage.set("PROFILE_PICTURE", res.user.imageUrl);
      const storeRole = this.storage.set("PROFILE_ROLE", res.user.role);
      const storeUsername = this.storage.set("PROFILE_USERNAME", res.user.username);

      return from(Promise.all([storeId, storeEmail, storePicture, storeRole, storeUsername]));
    })
  }

  async getProfileId(){
    return await this.storage.get("PROFILE_ID");
  }

  async getProfileEmail(){
    return await this.storage.get("PROFILE_EMAIL");
  }

  async getProfilePicture(){
    return await this.storage.get("PROFILE_PICTURE");
  }

  async getProfileRole(){
    return await this.storage.get("PROFILE_ROLE");
  }

  async getProfileUsername(){
    return await this.storage.get("PROFILE_USERNAME");
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
    return this.http.post(`${this.url}/auth/logout`, {}).pipe(
      switchMap(_ => {
        this.currentAccessToken = null;
        // Remove all stored tokens
        const deleteAccess = this.storage.remove("ACCESS_TOKEN_KEY");
        const deleteRefresh = this.storage.remove("REFRESH_TOKEN_KEY");
        this.user = null;
        return from(Promise.all([deleteAccess, deleteRefresh]));
      }),
      tap(_ => {
        this.isAuthenticated.next(false);
        this.router.navigateByUrl('/', { replaceUrl: true });
      })
    ).subscribe();
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
