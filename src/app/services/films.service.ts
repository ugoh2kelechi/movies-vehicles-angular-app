import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { appSettings } from '../constants/constant';

@Injectable({ providedIn: 'root' })

export class FilmsService {

  public filmsWithNameRank = [];
  public popularDirector: string = '';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getFilmsList(): Observable<any> {
    return this.http.get<any>(`${environment.BASE_HOST_URL}/${appSettings.API_MOVIES_ENDPOINT}`)
    .pipe(
      tap((res) => {
        this.setFilms(res);
        this.setPopularDirector(res);
      }),
      catchError(this.handleError<any>('getFilms', []))
    );
  }

  fillPeople(peopleData: any): Observable<any> {
    return this.http.post(
      `${environment.BASE_HOST_URL}/${appSettings.API_PEOPLE_ENDPOINT}`,
      peopleData,
      this.httpOptions)
      .pipe(
      tap((res) => console.log(`Added People =${res}`)),
      catchError(this.handleError<any>('AddedPeople'))
    );
  }

  fillSpecies(speciesData: any): Observable<any> {
    return this.http.post(
      `${environment.BASE_HOST_URL}/${appSettings.API_SPECIES_ENDPOINT}`,
      speciesData,
      this.httpOptions)
      .pipe(
      tap((res) => console.log(`Added Species =${res}`)),
      catchError(this.handleError<any>('AddedSpecies'))
    );
  }
  
  setFilms(films: any) {
    let sortedFilms = films.sort((a:any, b:any) => ((parseInt(a.rt_score)) < (parseInt(b.rt_score)) ? -1 : 1));
    this.filmsWithNameRank = sortedFilms.map((film: any) => { 
      return {
        'Name': film.title,
        'Rank': film.rt_score
      };
    });
  }

  getFilms() {
    return this.filmsWithNameRank;
  }

  setPopularDirector(films: any) {
    const countedDirector = this.count(films, function (film: any) {
      return film.director 
    });
    this.popularDirector = Object.keys(countedDirector).reduce((a, b) => countedDirector[a] > countedDirector[b] ? a : b);
  }

  getPopularDirector() {
    return this.popularDirector;
  }

  count(ary: any, classifier: any) {
    classifier = classifier || String;
    return ary.reduce(function (counter: any, item: any) {
        const p = classifier(item);
        counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        return counter;
    }, {})
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
