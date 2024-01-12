import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interface/country.interface';

@Injectable({
  providedIn: 'root',
})
export class ContriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  searchCountryByAlphaCode(code:string):Observable<Country | null>{
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
    .pipe(
      map( countries => countries.length > 0 ? countries[0]:null),
      catchError(() => of(null))
    )
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/capital/${term}`)
    .pipe(
      catchError(() => of([]))
    )
  }

  searchCountry(term: string):Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/name/${term}`)
    .pipe(
      catchError(() => of([]))
    )
  }

  searchRegion(region: string):Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`)
    .pipe(
      catchError(() => of([]))
    )
}
}
