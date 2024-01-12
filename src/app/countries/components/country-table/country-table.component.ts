import { Component, Input } from '@angular/core';
import { Country } from '../../interface/country.interface';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.css']
})
export class CountryTableComponent {
  @Input () countries:Country[] = [];
}
