import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth/auth.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getCurrentAccessToken().then(
      (res) => {
        this.httpOptions = { headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${res}`
        })}
      }
    )
   }

  addUser(user: User): Observable<any> {
    return this.http.post<User>(environment.api_url+'/users', user, this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('Add User'))
      );
  }

  getUser(id): Observable<User[]> {
    return this.http.get<User[]>(environment.api_url + '/users/' + id)
      .pipe(
        tap(_ => console.log(`User fetched: ${id}`)),
        catchError(this.handleError<User[]>(`Get User id=${id}`))
      );
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(environment.api_url + '/users')
      .pipe(
        tap(users => console.log('Users fetched!')),
        catchError(this.handleError<User[]>('Get Users', []))
      );
  }

  updateUser(id, user: any): Observable<any> {
    console.log(this.httpOptions)
    return this.http.patch(environment.api_url + '/users/' + id, user, this.httpOptions)
      .pipe(
        tap(_ => console.log(`User updated: ${id}`)),
        catchError(this.handleError<User[]>('Update User'))
      );
  }
  
  deleteUser(id): Observable<any> {
    return this.http.delete<User[]>(environment.api_url + '/user/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`User deleted: ${id}`)),
        catchError(this.handleError<User[]>('Delete User'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
