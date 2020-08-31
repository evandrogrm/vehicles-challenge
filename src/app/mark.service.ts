import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Mark } from '../shared/Mark';

@Injectable({
  providedIn: 'root',
})
export class MarkService extends RestApiService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    super(http);
    this.http = http;
  }

  findAll(): Observable<any> {
    return this.http
      .get<any>(this.apiURL + '/api/mark/v1')
      .pipe(retry(1), catchError(this.handleError));
  }

  get(id): Observable<Mark> {
    return this.http
      .get<any>(this.apiURL + '/api/mark/v1/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  create(employee): Observable<Mark> {
    return this.http
      .post<any>(
        this.apiURL + '/api/mark/v1/',
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  update(mark): Observable<Mark> {
    return this.http
      .put<any>(
        this.apiURL + '/api/mark/v1/',
        JSON.stringify(mark),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(id) {
    return this.http
      .delete<any>(this.apiURL + '/api/mark/v1/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
}
