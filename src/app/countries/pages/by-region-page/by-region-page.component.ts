import { Component, OnInit } from '@angular/core';
import { Country } from '../../interface/country.interface';
import { ContriesService } from '../../services/contries.service';
import { Region } from '../../interface/region.type';
@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css'],
})
export class ByRegionPageComponent implements OnInit {
  countries: Country[] = [];
  isLoading: boolean = false;
  regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedRegion?:Region;
  initialValue: string = "";

  constructor(private _countriesService: ContriesService) {}
  ngOnInit(): void {
    this.countries = this._countriesService.cacheStore.byRegion.countries
    this.selectedRegion = this._countriesService.cacheStore.byRegion.region
  }

  searchByRegion(region: Region): void {
    this.isLoading = true;
    this.selectedRegion = region;
    this._countriesService.searchRegion(region).subscribe((countries) => {
      this.isLoading = false;
      this.countries = countries;
      console.log(this.countries);
    });
  }
}
