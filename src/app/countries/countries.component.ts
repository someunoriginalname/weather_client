import { Component } from '@angular/core';
import { Country } from './country';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export class CountriesComponent {
  public countries: Country[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getCountries();

  }

  getCountries() { //was missing / before weatherforecast
    this.http.get<Country[]>(environment.baseUrl +'api/Countries').subscribe(
      {
        next: result => this.countries = result,
        error: error => console.error(error)
      }


    );
  }
  
}
