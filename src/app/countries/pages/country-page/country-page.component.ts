import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ContriesService } from '../../services/contries.service';
import { Country } from '../../interface/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css'],
})
export class CountryPageComponent implements OnInit {
  country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: ContriesService
  ) {}

  //Observable Help => observable dentro de otro observable
  // ngOnInit(): void {
  //   this.activatedRoute.params.subscribe(({id}) => {
  //     this.countriesService.searchCountryByAlphaCode(id).subscribe(country =>{
  //       console.log(country);
  //     });
  //   });
  // }

  // Alternativa

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) =>
          this.countriesService.searchCountryByAlphaCode(id)
        )
      )
      .subscribe((country) => {
        console.log(country);
        if (!country) return this.router.navigateByUrl('');
        return (this.country = country);
      });
  }
}
