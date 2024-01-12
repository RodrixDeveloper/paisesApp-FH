import { Component } from '@angular/core';
import { Country } from '../../interface/country.interface';
import { ContriesService } from '../../services/contries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent {
  countries: Country[] = [];
  constructor(private _countriesService: ContriesService) {}

  searchByCountry(term: string): void {
    this._countriesService.searchCountry(term).subscribe((countries) => {
      this.countries = countries;
      console.log(this.countries);
    });
  }
}
