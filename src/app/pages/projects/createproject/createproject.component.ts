import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import {HttpcallsService} from '../../../services/httpcalls.service'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {DatasharingService} from '../../../services/datasharing.service'

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.scss']
})
export class CreateprojectComponent implements OnInit {
  newProjectForm: FormGroup;
  rowsProjects
  loadingIndicatorProjects=true
  submitted = false;
  loading = false;
  error = "";
  success;
  code
  desc
  id
  selected=false
  citydata
  CityId=""
  projectStatus =""
  submitText="submit"
  projectdataget
  constructor(
    private httpcallservice:HttpcallsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datasharingservice: DatasharingService,
  ) { }

  ngOnInit() {
    this.newProjectForm = this.formBuilder.group({
      description: ["", Validators.required],
      name: ["", Validators.required],
      city: ["", Validators.required],
      status: ["", Validators.required],
      
    });
    
    this.getDataService()
  }
  
  public getDataService() {
    this.projectdataget = this.datasharingservice.getData();
    if (typeof this.projectdataget.project === "undefined" || "" || this.projectdataget.length < 0) {
    
      //this.getBlogs();
    } else {
      console.log(this.projectdataget.project)
      this.projectdataget= this.projectdataget.project
   // this.city=this.citydataget.city 
      //this.blog = this.blog.blog;
      this.code = this.projectdataget.code
      this.desc = this.projectdataget.description
      this.projectStatus = this.projectdataget.isActive
      this.CityId = this.projectdataget.cityId
    }
    this.getProjects()
    
  }
        // convenience getter for easy access to form fields
        get f() {
          return this.newProjectForm.controls;
        }

      
  onSubmit(){
    if (this.id==null||this.id==""||this.id ==undefined){
      this.submitProject()
    }
    else {
      this.editProject()
  }
}
editProject(){
  this.success = "";
  this.error = "";
  this.submitted = true;
  if (this.newProjectForm.invalid) {
    return;
  }
  let data = {
    "code": this.f.name.value,
    "description": this.f.description.value,
    "cityId": this.f.city.value,
    "isActive": this.f.status.value,
  }
  let id = this.id;
  this.loading = true;
  this.httpcallservice.editProject(id, data).subscribe(
    resp => {
      this.loading = false;
      this.success = "Project Edited Successfully";
      this.selected=false
      this.submitText ="Submit"
      this.id= ""
      return resp;
    },

    error => {
      this.success = "";
      this.error = "Could Not Edit Project";
      this.loading = false;
    }
  );

}

submitProject(){
  this.success = "";
  this.error = "";
  this.submitted = true;
  if (this.newProjectForm.invalid) {
    return;
  }
  let data = {
    "code": this.f.name.value,
    "description": this.f.description.value,
    "cityId": this.f.city.value,
    "isActive": this.f.status.value,
  }

  // stop here if form is invalid

  this.loading = true;
  this.httpcallservice.createProject(data).subscribe(
    (resp) => {
      this.submitted = false;
      this.loading = false;
      this.success = "New Project Created Successfully:!!";
      this.newProjectForm.reset();
      this.error = "";
      return resp;
    },
    (error) => {
      this.error = "Error. Could Not Create Project";
      this.loading = false;
      this.success = "";
    }
  );
}

getCities():void{
  this.httpcallservice.getAllCities()
  .subscribe((res: any) => {
      this.citydata =res;   
    }, err => {
    });
}

  getProjects():void{
    this.httpcallservice.getAllProjects()
    .subscribe((res: any) => {
        this.rowsProjects =res;
        this.loadingIndicatorProjects= false
        this.getCities()
      }, err => {
        console.log(err)
      });
  }
  onSelectEdit(data){
    this.submitText ="Edit"
    this.selected=true
    this.code = data.code
    this.desc= data.description
    this.id= data.id
    this.CityId= data.cityId
    this.projectStatus= data.isActive
  }
  deleteProject(){
    this.submitted = true;
    this.error = "";
    this.success = "";
    let id = this.id;
    this.loading = true;
    this.httpcallservice.deleteProject(id).subscribe(
      resp => {
        this.loading = false;
        this.error = "";
        this.success = "Projected Deleted Successfully";
        this.newProjectForm.reset();
        this.selected=false
        this.submitted = false;
        this.submitText ="Submit"

      },
      error => {
        this.loading = false;
        this.error = "Error Could Not Delete Project";
        this.success = "";
        this.submitted = false;
  }
  );
  }

  newProject(){
    this.submitText ="Submit"
    this.selected=false
    this.code = ""
    this.desc= ""
    this.id= ""
    this.CityId= ""
    this.projectStatus= ""
  }

}
