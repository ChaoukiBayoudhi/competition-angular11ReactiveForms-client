import { Competition } from '../classes/competition';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:9592/competitions';
@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(`${apiUrl}` + '/all')
      .pipe(
        tap(c => console.log('fetched competitions')),
        catchError(this.handleError('getCompetitions', []))
      );
  }

  getCompetitionById(id: BigInteger): Observable<Competition> {
    const url = `${apiUrl}` + '/compettion' + `/${id}`;
    return this.http.get<Competition>(url).pipe(
      tap(c => console.log(`fetched competitions id=${id}`)),
      catchError(this.handleError<Competition>(`getCompetitionById id=${id}`))
    );
  }

  addCompetition(competition: Competition): Observable<Competition> {
    return this.http.post<Competition>(apiUrl + '/newcompetition', competition, httpOptions).pipe(
      tap((c: Competition) => console.log(`added Competition w/ id=${c.id}`)),
      catchError(this.handleError<Competition>('addCompetition'))
    );
  }

  updateCompetition(id: BigInteger, competition: Competition): Observable<any> {
    const url = `${apiUrl}` + '/competition' + `/${id}`;
    return this.http.put(url, competition, httpOptions).pipe(
      tap(c => console.log(`updated Competition id=${id}`)),
      catchError(this.handleError<any>('updateCompetition'))
    );
  }

  deleteCompetition(id: BigInteger): Observable<Competition> {
    const url = `${apiUrl}` + '/competition' + `/${id}`;
    return this.http.delete<Competition>(url, httpOptions).pipe(
      tap(c => console.log(`deleted Competition id=${id}`)),
      catchError(this.handleError<Competition>('deleteCompetition'))
    );
  }
}
