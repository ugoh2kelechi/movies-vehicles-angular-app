import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { appSettings } from '../constants/constant';

@Injectable({ providedIn: 'root' })

export class VehiclesService {

  public arielBase = [];

  constructor(private http: HttpClient) { }

  /** GET list of Vehicles  */
  getVehicles(): Observable<any> {
    return this.http.get<any>(`${environment.BASE_HOST_URL}/${appSettings.API_VEHICLES_ENDPOINT}`)
    .pipe(
      tap((res) => {
        this.setAerialBased(res);
      }),
      catchError(this.handleError<any>('getVehicles', []))
    );
  }

  setAerialBased (vehicleList: any) {
    this.arielBase = vehicleList.filter((item: any) => item.vehicle_class === 'Airplane' || item.vehicle_class === 'Airship');
  }

  getAerialBased() {
    return this.arielBase;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
    
}
