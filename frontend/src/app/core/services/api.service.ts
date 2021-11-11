import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Echo} from '../../models/echo.model';
import {catchError, map} from 'rxjs/operators';
import {CreateUserInput} from '../../models/user.model';
import {ApiError, ApiOutput, LoginInput} from '../../models/api.model';
import {Router} from '@angular/router';
import {LastRouteService} from './last-route.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = 'http://localhost:3000/api';
  private readonly accessToken = localStorage.getItem('accessToken');
  private readonly refreshToken = localStorage.getItem('refreshToken');

  constructor(private http: HttpClient,
              private router: Router,
              private lastRoute: LastRouteService,
              private message: NzMessageService) {
  }

  /**
   * Handles the errors for the http requests
   * @param err
   */
  handleError(err: HttpErrorResponse) {
    if (err.status === 0) {
      console.error('A error accrued', err.error);
      return throwError({code: 0, message: '', title: ''});
    } else  {
      console.error(`Backend returned error code: ${err.status}. Body was: `, err.error);

      let newError: ApiError = {
        code: err.status,
        message: '',
        title: ''
      };

      switch (err.status) {
        case 400:
          newError.title = 'Request Body false';
          newError.message = 'Pleas fill the from right!';
          break;
        case 404:
          newError.title = 'Not Found';
          newError.message = 'Please try again later. The source is not ready!';
          break;
        case 403:
          this.message.error('Please login in first!', {nzDuration: 7000});
          this.router.navigate(['/login']).then();
          break;
        case 500:
          newError.title = 'Internal Server error';
          newError.message = 'The server has a internal error. Please try again later';
          break;
        default:
          newError.title = 'Unknown Error';
          newError.message = 'Please inform the developers!';
          break;
      }

      return throwError(err);
    }


  }

  /**
   * Creates a new User
   * @param user
   */
  createUser(user: CreateUserInput): Observable<ApiOutput> {
    return this.http.post<HttpResponse<any>>(
      `${this.baseUrl}/user`,
      user,
      {observe: 'response'}
    ).pipe(
      map((res) => {
        if (!res.body) {
          return {data: null};
        } else {
          return {data: (res.body as any)};
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Authenticates the user and collecting the tokens
   * @param loginData
   */
  login(loginData: LoginInput): Observable<ApiOutput> {
  	return this.http.post<HttpResponse<any>>(
  		`${this.baseUrl}/auth/login`,
  		loginData,
      {observe: 'response'}
  	).pipe(
      map((res) => {
        if (!res.body) {
          return {data: null};
        } else {
          return {data: (res.body as any)};
        }
      }),
  		catchError(this.handleError)
  	);
  }

  /**
   * gets a new access token
   * @param refreshToken
   */
  getNewToken(refreshToken: String): Observable<ApiOutput> {
    return this.http.post<HttpResponse<any>>(
      `${this.baseUrl}/auth/token`,
      {token: refreshToken},
      {observe: 'response'}
    ).pipe(
      map((res) => {
        if (!res.body) {
          return {data: null};
        } else {
          return {data: (res.body as any)};
        }
      }),
      catchError(this.handleError)
    );
  }
}
