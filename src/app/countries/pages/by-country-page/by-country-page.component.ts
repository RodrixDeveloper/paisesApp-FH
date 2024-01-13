import { Component, OnInit } from '@angular/core';
import { Country } from '../../interface/country.interface';
import { ContriesService } from '../../services/contries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css'],
})
export class ByCountryPageComponent implements OnInit {
  countries: Country[] = [];
  isLoading: boolean = false;
  initialValue: string = '';
  constructor(private _countriesService: ContriesService) {}

  ngOnInit(): void {
    this.countries = this._countriesService.cacheStore.byCountries.countries;
    this.initialValue = this._countriesService.cacheStore.byCountries.term;
  }

  searchByCountry(term: string): void {
    this.isLoading = true;
    this._countriesService.searchCountry(term).subscribe((countries) => {
      this.isLoading = false;
      this.countries = countries;
      console.log(this.countries);
    });
  }
}
