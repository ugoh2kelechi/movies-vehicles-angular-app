import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AppSettings } from '../constants/constant';

@Injectable()
export class FilmsService {

  constructor(private http: HttpClient) {}

  public get(url: string, options?: any) { 
    return this.http.get(url, options); 
  } 

}
