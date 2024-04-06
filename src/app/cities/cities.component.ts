import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { City } from './city';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  public cities: City[] = [];
  id: number;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.id = -1;
  }
  ngOnInit(): void {
    this.getCities();

  }
  getCities() {
    let idparameter = this.activatedRoute.snapshot.paramMap.get("id");
    this.id = idparameter? + idparameter: 0;
    this.http.get<City[]>('$environment.baseUrl)api/Cities1/' + this.id)
      .subscribe({
        next: (result) => {
            this.cities = result;
            error: (error: any)=>console.error(error);
        },
        error: (error) => console.error(error)
      });
  }
}