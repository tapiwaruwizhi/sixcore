import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import {HttpcallsService} from '../../../services/httpcalls.service'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {DatasharingService} from '../../../services/datasharing.service'

@Component({
  selector: 'app-cityprojects',
  templateUrl: './cityprojects.component.html',
  styleUrls: ['./cityprojects.component.scss']
})
export class CityprojectsComponent implements OnInit {
  cityForm: FormGroup;
  countrydata
  countryId
  desc
  code
  citydata
  url
  allprojectsdata
  cityurl
  rowsProjects
  loadingIndicatorProjects
  citydataget
  city
  CityId = ""
  loading=false
  citycode
  citydescription
  constructor(
    private httpcallservice:HttpcallsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datasharingservice: DatasharingService,
  ) { }

  ngOnInit() {
    this.cityForm = this.formBuilder.group({
      description: ["",{disabled: true}, Validators.required],
      name: ["", {disabled: true},Validators.required],
      city: ["", Validators.required],
    });
    this.getDataService()
  }

  public getDataService() {
    this.citydataget = this.datasharingservice.getData();
    this.url = this.router.url;
    if (typeof this.citydataget.city === "undefined" || "" || this.citydataget.length < 0) {
 
      this.getCurrentCityById()
    } else {
      console.log("data")
    this.city=this.citydataget.city 
    this.getCities()
    }
    
  }

  getProjects():void{
    this.httpcallservice.getAllProjects()
    .subscribe((res: any) => {
        this.allprojectsdata =res  
        this.rowsProjects = res  
       this.filterCurrentCity(this.city.id)

      }, err => {
        console.log(err)
      });
  }

  getCities():void{ 
    this.httpcallservice.getAllCities()
    .subscribe((res: any) => {
        this.citydata=res;
        this.getProjects()
      }, err => {
      });
  }


  getCurrentCityById(){
  let id = this.router.url.slice(6);
    this.httpcallservice.getCityById(id).subscribe(
      resp => {
        this.city =resp
        console.log(resp)
        this.citycode= this.city.code;
        this.citydescription = this.city.description
        this.getCities()
        return resp;
        
      },  
      error => {

      }
    );
  }

  filterCurrentCity(value) {
    let data = this.allprojectsdata
    console.log(data)
    let url = value;
    if(url==""||url==null||url==undefined){
      
    }
    else{
    let newObj = data.filter((el) => {
      console.log(el)
      console.log(url)
      return el.cityId.toString().indexOf(url) !== -1;
    });

    this.rowsProjects = newObj
    this.loadingIndicatorProjects= false
  }
  }

  filterCurrentCitySelected(value) {
    let data = this.citydata
    let search = value
    let newObj = data.filter((el) => {
      return el.id.toString().indexOf(search) !== -1;
    });
    this.citycode= newObj[0].code
    this.citydescription= newObj[0].description
  }

  onSelectEdit(data){
    this.router.navigate(["projects"]);
    this.datasharingservice.setData("project", data);
  }

  newCity(data){
    console.log(data)
    this.filterCurrentCity(data)
    this.filterCurrentCitySelected(data)
    this.router.navigate(["city",data]);
    //this.datasharingservice.setData("city", data);

  }



}
