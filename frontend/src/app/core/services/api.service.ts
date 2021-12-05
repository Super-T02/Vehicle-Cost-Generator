import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {CreateUserInput} from '../../models/user.model';
import {ApiError, ApiOutput, LoginInput} from '../../models/api.model';
import {Vehicle, VehicleInput} from '../../models/vehicle.model';
import {UtilService} from './util.service';
import {
  FuelCostItem,
  FuelCostItemInput,
  RepeatingCostItem,
  RepeatingCostItemInput,
  SingleCostItem,
  SingleCostItemInput
} from '../../models/cost.model';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = 'http://localhost:3000/api';
  private readonly accessToken = localStorage.getItem('accessToken');
  private readonly refreshToken = localStorage.getItem('refreshToken');

  constructor(private http: HttpClient, private util: UtilService) {
  }

  /**
   * Generates a actual header
   */
  generateHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.util.getAccessToken()}`
    });
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
          (err.error.errors && err.error.errors.length > 0)?
            newError.message = err.error.errors[0].msg:
            newError.message = 'Pleas fill the from right!';
          break;
        case 404:
          newError.title = 'Not Found';
          (err.error.errors && err.error.errors.length > 0)?
            newError.message = err.error.errors[0].msg:
            newError.message = 'Please try again later. The source is not ready!';
          break;
        case 403:
          newError.title = 'Forbidden';
          newError.message = 'You have not the permission to do that!';
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
      console.log(newError);
      return throwError(newError);
    }


  }

  /**
   * Creates a new User
   * @param user
   */
  createUser(user: CreateUserInput): Observable<ApiOutput> {
    return this.http.post<HttpResponse<any>>(
      `${this.baseUrl}/users`,
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

  /**
   * Remove refreshtoken from db
   * @param refreshToken
   */
  logout(refreshToken: String): Observable<ApiOutput> {
    return this.http.post<HttpResponse<any>>(
      `${this.baseUrl}/auth/logout`,
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

  /**
   * Create a new vehicle
   * @param vehicle
   * @param username
   */
  createVehicle(vehicle: VehicleInput, username: string): Observable<any> {
    return this.http.post<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles`,
      vehicle,
      {
        headers: this.generateHeader(),
        observe: 'response'
      },
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
   * Get all vehicles of the given user
   * @param username
   */
  getVehicles(username: string): Observable<ApiOutput> {
    return this.http.get<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles`,
      {
        headers: this.generateHeader(),
        observe: 'response'
      },
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
   * Get one specific vehicles of the given user
   * @param username
   * @param vin
   */
  getVehicle(username: string, vin: string): Observable<ApiOutput> {
    return this.http.get<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles/${vin.toUpperCase()}`,
      {
        headers: this.generateHeader(),
        observe: 'response'
      },
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
   * Deletes a vehicle from the db
   * @param vin
   * @param username
   */
  deleteVehicle(vin: string, username: string): Observable<ApiOutput> {
    return this.http.delete<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles/${vin.toUpperCase()}`,
      {
        headers: this.generateHeader(),
        observe: 'response'
      }
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
   * Updates a vehicle in the db
   * @param vin
   * @param username
   * @param vehicle
   */
  updateVehicle(vin: string, username: string, vehicle: Vehicle): Observable<ApiOutput> {
    return this.http.put<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles/${vin.toUpperCase()}`,
      vehicle,
      {
        headers: this.generateHeader(),
        observe: 'response'
      }
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
   * Gets all single cost items
   * @param username
   * @param vin
   */
  getSingleCosts(username: string, vin: string): Observable<ApiOutput> {
    return this.http.get<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles/${vin.toUpperCase()}/singleCosts`,
      {
        headers: this.generateHeader(),
        observe: 'response'
      },
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
   * Gets all repeating cost items
   * @param username
   * @param vin
   */
  getRepeatingCosts(username: string, vin: string): Observable<ApiOutput> {
    return this.http.get<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles/${vin.toUpperCase()}/repeatingCosts`,
      {
        headers: this.generateHeader(),
        observe: 'response'
      },
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
   * Gets all fuel cost items
   * @param username
   * @param vin
   */
  getFuelCosts(username: string, vin: string): Observable<ApiOutput> {
    return this.http.get<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles/${vin.toUpperCase()}/fuelCosts`,
      {
        headers: this.generateHeader(),
        observe: 'response'
      },
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
   * Create a new single cost item
   * @param item
   * @param username
   * @param vin
   */
  createSingleCostItem(item: SingleCostItemInput, username: string, vin: string): Observable<any> {
    return this.http.post<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles/${vin}/singleCosts`,
      item,
      {
        headers: this.generateHeader(),
        observe: 'response'
      },
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
   * Create a new repeating cost item
   * @param item
   * @param username
   * @param vin
   */
  createRepeatingCostItem(item: RepeatingCostItemInput, username: string, vin: string): Observable<any> {
    return this.http.post<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles/${vin}/repeatingCosts`,
      item,
      {
        headers: this.generateHeader(),
        observe: 'response'
      },
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
   * Create a new fuel cost item
   * @param item
   * @param username
   * @param vin
   */
  createFuelCostItem(item: FuelCostItemInput, username: string, vin: string): Observable<any> {
    return this.http.post<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles/${vin}/fuelCosts`,
      item,
      {
        headers: this.generateHeader(),
        observe: 'response'
      },
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
   * Get one specific single cost item of the given user with the given vin
   * @param username
   * @param vin
   * @param id
   */
  getSingleCost(username: string, vin: string, id: string): Observable<ApiOutput> {
    return this.http.get<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles/${vin.toUpperCase()}/singleCosts/${id}`,
      {
        headers: this.generateHeader(),
        observe: 'response'
      },
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
   * Get one specific repeating cost item of the given user with the given vin
   * @param username
   * @param vin
   * @param id
   */
  getRepeatingCost(username: string, vin: string, id: string): Observable<ApiOutput> {
    return this.http.get<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles/${vin.toUpperCase()}/repeatingCosts/${id}`,
      {
        headers: this.generateHeader(),
        observe: 'response'
      },
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
   * Get one specific fuel cost item of the given user with the given vin
   * @param username
   * @param vin
   * @param id
   */
  getFuelCost(username: string, vin: string, id: string): Observable<ApiOutput> {
    return this.http.get<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles/${vin.toUpperCase()}/fuelCosts/${id}`,
      {
        headers: this.generateHeader(),
        observe: 'response'
      },
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
   * Updates a single cost item in the db
   * @param vin
   * @param username
   * @param id
   * @param item
   */
  updateSingleCostItem(vin: string, username: string, id: string, item: SingleCostItem): Observable<ApiOutput> {
    return this.http.put<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles/${vin.toUpperCase()}/singleCosts/${id}`,
      item,
      {
        headers: this.generateHeader(),
        observe: 'response'
      }
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
   * Updates a repeating cost item in the db
   * @param vin
   * @param username
   * @param id
   * @param item
   */
  updateRepeatingCostItem(vin: string, username: string, id: string, item: RepeatingCostItem): Observable<ApiOutput> {
    return this.http.put<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles/${vin.toUpperCase()}/repeatingCosts/${id}`,
      item,
      {
        headers: this.generateHeader(),
        observe: 'response'
      }
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
   * Updates a fuel cost item in the db
   * @param vin
   * @param username
   * @param id
   * @param item
   */
  updateFuelCostItem(vin: string, username: string, id: string, item: FuelCostItem): Observable<ApiOutput> {
    return this.http.put<HttpResponse<any>>(
      `${this.baseUrl}/users/${username.toLowerCase()}/vehicles/${vin.toUpperCase()}/fuelCosts/${id}`,
      item,
      {
        headers: this.generateHeader(),
        observe: 'response'
      }
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
