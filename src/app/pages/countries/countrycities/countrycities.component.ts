import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import {HttpcallsService} from '../../../services/httpcalls.service'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {DatasharingService} from '../../../services/datasharing.service'

@Component({
  selector: 'app-countrycities',
  templateUrl: './countrycities.component.html',
  styleUrls: ['./countrycities.component.scss']
})
export class CountrycitiesComponent implements OnInit {
  countryForm: FormGroup;
  country  
  countrydata
  citydata
  countrydataget
  rowsCities
  countrycode
  countrydesc
  loadingIndicatorCities= true
  allCitiesdata

  constructor(
    private httpcallservice:HttpcallsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datasharingservice: DatasharingService,
  ) { }

  ngOnInit() {
    this.countryForm = this.formBuilder.group({
      description: ["",{disabled: true}, Validators.required],
      name: ["", {disabled: true},Validators.required],
      country: ["", Validators.required],
    });
    this.getDataService(

    )
  }
  
  getDataService(){
    this.countrydataget = this.datasharingservice.getData();
    if (typeof this.countrydataget.country === "undefined" || "" || this.countrydataget.length < 0) {
    } else {
      console.log("data")
    this.country=this.countrydataget.country 
    this.countrycode= this.country.code
    this.countrydesc= this.country.description
    }
    this.getCountries()
  }

  getCities():void{
    this.httpcallservice.getAllCities()
    .subscribe((res: any) => {
        this.rowsCities =res;
        this.loadingIndicatorCities= false
        this.allCitiesdata = res
     
      }, err => {
        console.log(err)
      });
  }

  getCountries():void{
    this.httpcallservice.getAllCountries()
    .subscribe((res: any) => {
        this.countrydata =res;
        this.getCities()
        
      }, err => {
        console.log(err)
      });
  }

  filterCurrentCountry(value) {
    let data = this.allCitiesdata
    
    console.log(data)
    let search = value
    let newObj = data.filter((el) => {
      console.log(el)
      console.log(search)
      return el.countryId.toString().indexOf(search) !== -1;
    });

    this.rowsCities = newObj
    this.loadingIndicatorCities= false
  
  }

  filterCurrentCountrySelected(value) {
    let data = this.countrydata
    let search = value
    let newObj = data.filter((el) => {
      return el.id.toString().indexOf(search) !== -1;
    });
    this.countrycode= newObj[0].code
    this.countrydesc= newObj[0].description
  }


  newCountry(data){
    this.filterCurrentCountry(data)
    this.filterCurrentCountrySelected(data)
  }
  getProject(data){
    this.router.navigate(["city"]);
    this.datasharingservice.setData("city", data);
  }
  onSelectEdit(data){
    this.router.navigate(["cities"]);
    this.datasharingservice.setData("cities", data);
  }

}
