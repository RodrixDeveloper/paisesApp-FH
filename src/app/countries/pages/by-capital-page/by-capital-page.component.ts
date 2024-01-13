import { Component, OnInit } from '@angular/core';
import { ContriesService } from '../../services/contries.service';
import { Country } from '../../interface/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css'],
})
export class ByCapitalPageComponent implements OnInit {
  countries: Country[] = [];
  isLoading: boolean = false;
  initialValue: string = "";

  constructor(private _countriesService: ContriesService) {}

  ngOnInit(): void {
   this.countries = this._countriesService.cacheStore.byCapital.countries
   this.initialValue = this._countriesService.cacheStore.byCapital.term
  }

  searchByCapital(term: string): void {
    this.isLoading = true;
    this._countriesService.searchCapital(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
      console.log(this.countries);
    });
  }
}
