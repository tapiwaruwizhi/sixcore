import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import {HttpcallsService} from '../../../services/httpcalls.service'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {DatasharingService} from '../../../services/datasharing.service'

@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.scss']
})
export class CreateCountryComponent implements OnInit {
  newCountryForm: FormGroup;
  loadingIndicatorCountries = true
  rowsCountries
  selectedCountries
  submitted = false;
  loading = false;
  error = "";
  success;
  code
  desc
  id
  selected=false
  countrydataget
  country

  constructor(
    private httpcallservice:HttpcallsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datasharingservice: DatasharingService,
  ) { }

  ngOnInit() {
    this.newCountryForm = this.formBuilder.group({
      description: ["", Validators.required],
      name: ["", Validators.required],
    });
    this.getDataService()
  }

    // convenience getter for easy access to form fields
    get f() {
      return this.newCountryForm.controls;
    }

    getDataService(){
      this.countrydataget = this.datasharingservice.getData();
      if (typeof this.countrydataget.country === "undefined" || "" || this.countrydataget.length < 0) {
      } else {
        console.log("data")
      this.country=this.countrydataget.country 
      this.code= this.country.code
      this.desc= this.country.description
      this.selected=true
      }
      this.getCountries()
    }


    ////////////////////////////country
    getCountries():void{
      this.loadingIndicatorCountries =true
      this.httpcallservice.getAllCountries()
      .subscribe((res: any) => {
          this.rowsCountries =res;
          this.loadingIndicatorCountries= false
        }, err => {
          console.log(err)
        });
    }


onSubmit(){
  if (this.selected==true){
    this.editCountry()
  }
  else {
    this.submitCountry()
  }
}
editCountry(){
  this.success = "";
  this.error = "";
  this.submitted = true;
  if (this.newCountryForm.invalid) {
    return;
  }
  let data = {
    "code": this.f.name.value,
    "description": this.f.description.value,
  }

  let id = this.id;
  this.loading = true;
  this.httpcallservice.editCountry(id, data).subscribe(
    resp => {
      this.loading = false;
      this.success = "Country Edited Successfully";
      this.getCountries()
      return resp;
    },

    error => {
      this.success = "";
      this.error = "Could Not Edit Country";
      this.loading = false;
    }
  );

}

    clicked(data){
      this.selected=true
      this.code = data.selected[0].code
      this.desc= data.selected[0].description
      this.id= data.selected[0].id
      console.log(data.selected[0])
    }

    submitCountry(){
      this.success = "";
      this.error = "";
      this.submitted = true;
      if (this.newCountryForm.invalid) {
        return;
      }
      let data = {
        "code": this.f.name.value,
        "description": this.f.description.value,
      }
  
      // stop here if form is invalid
  
      this.loading = true;
      this.httpcallservice.createCountry(data).subscribe(
        (resp) => {
          this.submitted = false;
          this.loading = false;
          this.success = "New Country Created Successfully:!!\n\n";
          this.newCountryForm.reset();
  
          this.error = "";
          this.getCountries()
          return resp;
          
        },
        (error) => {
          this.error = "Error. Could Not Create Country";
          this.loading = false;
          this.success = "";
        }
      );
    }


    deleteCountry(){
      this.submitted = true;
      this.error = "";
      this.success = "";
      let id = this.id;
      this.loading = true;
      this.httpcallservice.deleteCountry(id).subscribe(
        resp => {
          this.loading = false;
          this.error = "";
          this.success = "Country Deleted Successfully";
          this.newCountryForm.reset();
        },
        error => {
          this.loading = false;
          this.error = "Error Could Not Delete Country";
          this.success = "";
          this.submitted = false;
    }
    );
  }

  getCities(data){
    this.router.navigate(["country"]);
    this.datasharingservice.setData("country", data);
  }

  onSelectEdit(data){
    this.selected=true
    this.code = data.code
    this.desc= data.description
    this.id= data.id
  }

  newCountry(){
    this.selected=false
    this.code =""
    this.desc=""
    this.id= ""
  }



}
