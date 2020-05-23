import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import {HttpcallsService} from '../../../services/httpcalls.service'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {DatasharingService} from '../../../services/datasharing.service'


@Component({
  selector: 'app-createcity',
  templateUrl: './createcity.component.html',
  styleUrls: ['./createcity.component.scss']
})
export class CreatecityComponent implements OnInit {
  newCityForm: FormGroup;
  loadingIndicatorCities
  rowsCities
  countrydata
  submitted = false;
  loading = false;
  error = "";
  success;
  code
  desc
  id
  selected=false
  countryId =""
  citydataget
  constructor(
    private httpcallservice:HttpcallsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datasharingservice: DatasharingService,
  ) { }

  ngOnInit() {
    this.newCityForm = this.formBuilder.group({
      description: ["", Validators.required],
      name: ["", Validators.required],
      country: ["", Validators.required],
      
    });
    this.getCities()
    this.getDataServices()
  
  }

  getDataServices(){
    this.citydataget = this.datasharingservice.getData();
    console.log(this.citydataget.cities)
    if (typeof this.citydataget.cities === "undefined" || "" || this.citydataget.length < 0) {
    } else {
      console.log("data")
    this.citydataget=this.citydataget.cities
    this.code= this.citydataget.code
    this.desc= this.citydataget.description
    this.id=this.citydataget.id
    this.countryId=this.citydataget.countryId
    this.selected=true
    }
    

  }
      ////////////////////////////country
      getCountries():void{
        this.httpcallservice.getAllCountries()
        .subscribe((res: any) => {
            this.countrydata =res
            console.log(this.countrydata)
          }, err => {
            console.log(err)
          });
      }
  
      // convenience getter for easy access to form fields
      get f() {
        return this.newCityForm.controls;
      }

  clicked(data){
    this.selected=true
    this.code = data.selected[0].code
    this.desc= data.selected[0].description
    this.id= data.selected[0].id
    console.log(data.selected[0])
  }

  getCities():void{
    this.httpcallservice.getAllCities()
    .subscribe((res: any) => {
        this.rowsCities =res;
        this.loadingIndicatorCities= false
        this.getCountries()
      }, err => {
        console.log(err)
      });
  }

  onSubmit(){
    if (this.id==null||this.id==""||this.id ==undefined){
      this.submitCountry()
    }
    else {
      this.editCity()
    }
  }
  //////////////////////
  editCity(){
    this.success = "";
    this.error = "";
    this.submitted = true;
    if (this.newCityForm.invalid) {
      return;
    }
    let data = {
      "code": this.f.name.value,
      "description": this.f.description.value,
      "countryId": this.f.country.value,
    }
    let id = this.id;
    this.loading = true;
    this.httpcallservice.editCity(id, data).subscribe(
      resp => {
        this.loading = false;
        this.success = "City Edited Successfully";
        this.selected=false

        return resp;
      },
  
      error => {
        this.success = "";
        this.error = "Could Not Edit City";
        this.loading = false;
      }
    );

  }
  ////////////////////
  submitCountry(){
    this.success = "";
      this.error = "";
      this.submitted = true;
      if (this.newCityForm.invalid) {
        return;
      }
      let data = {
        "code": this.f.name.value,
        "description": this.f.description.value,
        "countryId": this.f.country.value,
      }
  
      // stop here if form is invalid
  
      this.loading = true;
      this.httpcallservice.createCity(data).subscribe(
        (resp) => {
          this.submitted = false;
          this.loading = false;
          this.success = "New City Created Successfully:!!";
          this.newCityForm.reset();
  
          this.error = "";
          return resp;
        },
        (error) => {
          this.error = "Error. Could Not Create City";
          this.loading = false;
          this.success = "";
        }
      );
  }
  ///////////////
  onSelectRed(row) {
    console.log(row);
  }
  
  onSelectEdit(data){
    this.selected=true
    this.code = data.code
    this.desc= data.description
    this.id= data.id
    this.countryId= data.countryId
  }
  deleteCity(){
    this.submitted = true;
    this.error = "";
    this.success = "";
    let id = this.id;
    this.loading = true;
    
    this.httpcallservice.deleteCity(id).subscribe(
      resp => {
        this.loading = false;
        this.error = "";
        this.success = "City Deleted Successfully";
        this.newCityForm.reset();
        this.selected=false
        this.submitted = false;

      },
      error => {
        this.loading = false;
        this.error = "Error Could Not Delete City";
        this.success = "";
        this.submitted = false;
  }
  );
  }

  newCity(){
    this.selected=false
    this.code =""
    this.desc= ""
    this.id= ""
    this.countryId= ""

  }

  getProject(data){
    this.router.navigate(["city", data.id]);
    this.datasharingservice.setData("city", data);

  }
}