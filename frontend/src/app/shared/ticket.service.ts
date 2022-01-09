import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth/auth.service';
import { Ticket } from './ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
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

  addTicketLike(ticket: Ticket): Observable<any> {
    return this.http.post<Ticket>(environment.api_url+'/tickets/like', ticket, this.httpOptions)
      .pipe(
        catchError(this.handleError<Ticket>('Add Ticket'))
      );
  }

  addTicketBuy(ticket: Ticket): Observable<any> {
    return this.http.post<Ticket>(environment.api_url+'/tickets/buy', ticket, this.httpOptions)
      .pipe(
        catchError(this.handleError<Ticket>('Add Ticket'))
      );
  }

  getTicket(id): Observable<any> {
    return this.http.get<Ticket[]>(environment.api_url + '/tickets/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Ticket fetched: ${id}`)),
        catchError(this.handleError<Ticket[]>(`Get Ticket id=${id}`))
      );
  }

  getTicketListByUserId(id): Observable<any> {
    return this.http.get<any[]>(environment.api_url + '/tickets/user/' + id, this.httpOptions)
      .pipe(
        tap(tickets => console.log('Tickets fetched!')),
        catchError(this.handleError<any[]>('Get Tickets', []))
      );
  }

  getTicketListByEventId(id): Observable<any> {
    return this.http.get<Ticket[]>(environment.api_url + '/tickets/event/' + id, this.httpOptions)
      .pipe(
        tap(tickets => console.log('Tickets fetched!')),
        catchError(this.handleError<Ticket[]>(`Get Tickets for user ${id}`, []))
      );
  }

  updateTicket(id, ticket: Ticket): Observable<any> {
    return this.http.put(environment.api_url + '/tickets/' + id, ticket, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Ticket updated: ${id}`)),
        catchError(this.handleError<Ticket[]>('Update Ticket'))
      );
  }

  deleteTicket(id){
    return this.http.delete<Ticket[]>(environment.api_url + '/tickets/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Ticket deleted: ${id}`)),
        catchError(this.handleError<Ticket[]>('Delete Ticket'))
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
