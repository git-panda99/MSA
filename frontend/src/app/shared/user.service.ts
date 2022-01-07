import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

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

  updateUser(id, event: User): Observable<any> {
    return this.http.put(environment.api_url + '/users/' + id, event, this.httpOptions)
      .pipe(
        tap(_ => console.log(`User updated: ${id}`)),
        catchError(this.handleError<User[]>('Update User'))
      );
  }
  
  deleteUser(id): Observable<User[]> {
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
