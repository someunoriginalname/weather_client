import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss'
})
export class HelloComponent implements OnInit{
  public forecasts: WeatherForecast[] = [];
  // baseUrl = "http://localhost:5100/"; Hardcoded so bad...
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getForecasts();

  }

  getForecasts() { //was missing / before weatherforecast
    this.http.get<WeatherForecast[]>(environment.baseUrl +'WeatherForecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
}