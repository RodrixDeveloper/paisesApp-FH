import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { CacheStorage } from '../interface/cache-store.interface';
import { Country } from '../interface/country.interface';
import { Region } from '../interface/region.type';

@Injectable({
  providedIn: 'root',
})
export class ContriesService {
  
  private apiUrl: string = 'https://restcountries.com/v3.1';
 
  public cacheStore:CacheStorage = {
    byCapital: {term:'', countries:[]},
    byCountries: {term:'', countries:[]},
    byRegion: {region:'', countries:[]}
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();  //volver a cargar lo que esta en el localStorage
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage(): void {
    if (!localStorage.getItem('cacheStore')) return;  //condicional para saber si existe el cacheStore, si es la primera vez que el usuario esta iniciando la aplicacion.
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError(() => of([])),   // si tenemos un error decimos que vacie la lista
      //delay(2000)                 // delay espera 2s y luego continua con el flujo, el delay es como el setTimeout
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      // tap(countries=> this.cacheStore.byCapital = {term: term, countries: countries}),
      tap(countries=> this.cacheStore.byCapital = {term,countries}),
      tap(()=> this.saveToLocalStorage())
    )
    ;
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries=> this.cacheStore.byCountries = {term,countries}),
      tap(()=> this.saveToLocalStorage())
    )
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries=> this.cacheStore.byRegion = {region,countries}),
      tap(()=> this.saveToLocalStorage())
    )
  }

}
