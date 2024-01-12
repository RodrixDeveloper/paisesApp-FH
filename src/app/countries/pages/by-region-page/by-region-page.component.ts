import { Component } from '@angular/core';
import { Country } from '../../interface/country.interface';
import { ContriesService } from '../../services/contries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent {
  countries: Country[] = [];
  constructor(private _countriesService: ContriesService) {}

  searchByRegion(term: string): void {
    this._countriesService.searchRegion(term).subscribe((countries) => {
      this.countries = countries;
      console.log(this.countries);
    });
  }
}