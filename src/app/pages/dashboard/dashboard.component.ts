import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import {HttpcallsService} from '../../services/httpcalls.service'
import {DatasharingService} from '../../services/datasharing.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loadingIndicatorCountries = true
  loadingIndicatorCities = true
  loadingIndicatorProjects = true
  rowsCities
  rowsCountries
  rowsProjects
  selectedCountries
  selectedCities
  selectedProjects
  
  constructor(
    private httpcallservice:HttpcallsService,
    private router: Router,
    private datasharingservice: DatasharingService,
  ) { }

  ngOnInit() {
    this.getCountries()
    this.getCities()
    this.getProjects()
 
  }

  ////////////////////////////country
  getCountries():void{
      this.httpcallservice.getAllCountries()
      .subscribe((res: any) => {
          this.rowsCountries =res;
          this.loadingIndicatorCountries= false
        }, err => {
          console.log(err)
        });
    }

    onSelectEditCountry(data){
      this.router.navigate(["countries"]);
      this.datasharingservice.setData("country", data);
    }



/////////////////////////////cities
getCities():void{
  this.httpcallservice.getAllCities()
  .subscribe((res: any) => {
      this.rowsCities =res;
      this.loadingIndicatorCities= false
    }, err => {
      console.log(err)
    });
}
onSelectEditCity(data){
  this.router.navigate(["cities"]);
  this.datasharingservice.setData("cities", data);

}

////////////////////////////projects

getProjects():void{
  this.httpcallservice.getAllProjects()
  .subscribe((res: any) => {
      this.rowsProjects =res;
      this.loadingIndicatorProjects= false
    }, err => {
      console.log(err)
    });
}

onSelectEditProject(data){
  this.router.navigate(["projects"]);
  this.datasharingservice.setData("project", data);
}

}


