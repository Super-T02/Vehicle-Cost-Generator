import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Echo} from '../../models/echo.model';
import {catchError} from 'rxjs/operators';
import {CreateUserOutput, CreateUserInput} from '../../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }

  /**
   * Creates a new User
   * @param user
   */
  createUser(user: CreateUserInput): Observable<CreateUserOutput> {
  	return this.http.post<CreateUserOutput>(
  		`${this.baseUrl}/user`,
  		user
  	).pipe(
  		catchError((err) => {
  			console.log('In Service:', err);
  			return throwError(err);
  		})
  	);
  }

  doError(): Observable<Echo> {
  	return this.http.post<Echo>(
  		`${this.baseUrl}/echo`,
  		{}
  	).pipe(
  		catchError((err) => {
  			console.log('In Service:', err);
  			return throwError(err);
  		})
  	);
  }

  getEchos(contains?: string): Observable<Echo[]> {
  	return this.http.get<Echo[]>(
  		`${this.baseUrl}/echo`,
  		{
  			params: contains ? {
  				contains
  			} : undefined
  		}
  	);
  }
}
