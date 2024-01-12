import { Component } from '@angular/core';
import { ContriesService } from '../../services/contries.service';
import { Country } from '../../interface/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css'],
})
export class ByCapitalPageComponent {
  countries: Country[] = [];
  constructor(private _countriesService: ContriesService) {}

  searchByCapital(term: string): void {
    this._countriesService.searchCapital(term).subscribe((countries) => {
      this.countries = countries;
      console.log(this.countries);
    });
  }
}
