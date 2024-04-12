import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { City } from './city';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent {
  public cities: City[] = [];
  public columns: string[] = [ "cityId","latitude","longitude","name","population"];
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
    this.http.get<City[]>(`${environment.baseUrl}api/Countries/CountryCities/${this.id}`).subscribe(
      {
        next: result => this.cities = result,
        error: error => console.log(error)
      }
    );
  }
}