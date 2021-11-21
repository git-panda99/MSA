import { Injectable } from '@angular/core';
import { EventVideo } from './event-video';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventVideoService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addEventVideo(event: EventVideo): Observable<any> {
    return this.http.post<EventVideo>(environment.api_url+'/events', event, this.httpOptions)
      .pipe(
        catchError(this.handleError<EventVideo>('Add Event'))
      );
  }

  getEventVideo(id): Observable<EventVideo[]> {
    return this.http.get<EventVideo[]>(environment.api_url + '/events/' + id)
      .pipe(
        tap(_ => console.log(`Event fetched: ${id}`)),
        catchError(this.handleError<EventVideo[]>(`Get Event id=${id}`))
      );
  }

  getEventVideoList(): Observable<EventVideo[]> {
    return this.http.get<EventVideo[]>(environment.api_url + '/events/')
      .pipe(
        tap(events => console.log('Events fetched!')),
        catchError(this.handleError<EventVideo[]>('Get Events', []))
      );
  }

  updateEventVideo(id, event: EventVideo): Observable<any> {
    return this.http.put(environment.api_url + '/events/' + id, event, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Event updated: ${id}`)),
        catchError(this.handleError<EventVideo[]>('Update Event'))
      );
  }

  deleteEventVideo(id): Observable<EventVideo[]> {
    return this.http.delete<EventVideo[]>(environment.api_url + '/events/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Event deleted: ${id}`)),
        catchError(this.handleError<EventVideo[]>('Delete Event'))
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
