import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import {HttpcallsService} from './services/httpcalls.service'
import{DatasharingService} from './services/datasharing.service'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CreateCountryComponent } from './pages/countries/create-country/create-country.component';
import { CreatecityComponent } from './pages/cities/createcity/createcity.component';
import { CityprojectsComponent } from './pages/cities/cityprojects/cityprojects.component';
import { CreateprojectComponent } from './pages/projects/createproject/createproject.component';
import { CountrycitiesComponent } from './pages/countries/countrycities/countrycities.component';
import { HeaderComponent } from './pages/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LandingpageComponent,
    CreateCountryComponent,
    CreatecityComponent,
    CityprojectsComponent,
    CreateprojectComponent,
    CountrycitiesComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxDatatableModule,
    HttpClientModule
  ],
  providers: [

    HttpcallsService,
    DatasharingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
