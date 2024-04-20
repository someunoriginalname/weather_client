import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { CountriesComponent } from './countries/countries.component';
import { CitiesComponent } from './countries/cities/cities.component';
import { LoginComponent } from '../auth/login.component';
export const routes: Routes = [
{path:'', component:HelloComponent, pathMatch: 'full'}, 
{path:'countries', component:CountriesComponent},
{path: 'countries/:id', component:CitiesComponent},
{path: 'login', component:LoginComponent}
];
