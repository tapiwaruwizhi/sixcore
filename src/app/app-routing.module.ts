import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingpageComponent} from './pages/landingpage/landingpage.component'
import {DashboardComponent} from './pages/dashboard/dashboard.component'
import { CreateCountryComponent } from './pages/countries/create-country/create-country.component';
import { CreatecityComponent } from './pages/cities/createcity/createcity.component';
import { CityprojectsComponent } from './pages/cities/cityprojects/cityprojects.component';
import { CreateprojectComponent } from './pages/projects/createproject/createproject.component';
import { CountrycitiesComponent } from './pages/countries/countrycities/countrycities.component';


const routes: Routes = [
  {
    path:'',
    component:LandingpageComponent,
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full'},
      { path: 'countries', component: CreateCountryComponent},
      { path: 'country', component: CountrycitiesComponent},
      { path: 'cities', component: CreatecityComponent},
      { path: 'city', component: CityprojectsComponent},
      { path: 'city/:single', component: CityprojectsComponent},
      { path: 'projects', component: CreateprojectComponent},
      { path: 'projects/:single', component: CreateprojectComponent},
    ]
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
