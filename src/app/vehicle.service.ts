import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from 'src/shared/Vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService extends RestApiService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    super(http);
    this.http = http;
  }

  findAll(): Observable<any> {
    return this.http
      .get<any>(this.apiURL + '/api/vehicle/v1')
      .pipe(retry(1), catchError(this.handleError));
  }

  get(id): Observable<Vehicle> {
    return this.http
      .get<any>(this.apiURL + '/api/vehicle/v1/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  create(vehicle): Observable<Vehicle> {
    return this.http
      .post<any>(
        this.apiURL + '/api/vehicle/v1/',
        JSON.stringify(vehicle),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  update(vehicle): Observable<Vehicle> {
    return this.http
      .put<any>(
        this.apiURL + '/api/vehicle/v1/',
        JSON.stringify(vehicle),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(id) {
    return this.http
      .delete<any>(this.apiURL + '/api/vehicle/v1/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
}
