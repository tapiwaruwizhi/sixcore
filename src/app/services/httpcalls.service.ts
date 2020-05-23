import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders,HttpEventType,HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { catchError, retry } from "rxjs/internal/operators";

//import {Http, ResponseContentType} from '@angular/http';
 
const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, PUT, OPTIONS",
    "Content-Type":"application/json",
    "Access-Control-Allow-Headers":
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,Access-Control-Allow-Origin",
  })
};

@Injectable()
export class HttpcallsService {

///////////////main url
  apiMain= "https://localhost:44395/api"


/////////countries  url
getAllCountriesUrl= this.apiMain+'/countries'
getCountryByIdUrl= this.apiMain +'/countries'
createCountryUrl= this.apiMain + '/countries'
editCountryUrl= this.apiMain + '/countries/'
deleteCountryUrl= this.apiMain + '/countries/'

/////////////////////cities url//////////
getAllCitiesUrl=this.apiMain+'/cities'
getCityByUrl= this.apiMain+'/cities/'
createCityUrl= this.apiMain+'/cities'
editCityUrl= this.apiMain+'/cities/'
deleteCityUrl= this.apiMain+'/cities/'

////////////////////////////  projects
getAllProjectsUrl=this.apiMain+'/projects'
getProjectByIdUrl= this.apiMain+'/projects/'
createProjectUrl= this.apiMain+'/projects'
editProjectUrl= this.apiMain+'/projects/'
deleteProjectUrl= this.apiMain+'/projects/'
  
  constructor(private http: HttpClient) { }

/////////////////////////////////countries
getAllCountries(): Observable<any[]> {
  return this.http.get<any[]>(this.getAllCountriesUrl).pipe(retry(3));
}
getCountryById(id): Observable<any[]> {
  return this.http.get<any[]>(this.getCountryByIdUrl + id, httpOptions).pipe(retry(3));
}
createCountry(data): Observable<any> {
  return this.http
    .post<any>(this.createCountryUrl, data, httpOptions)
    .pipe(retry(3));
}
editCountry(id: any, data): Observable<any> {
  return this.http
    .patch<any>(this.editCountryUrl + id,  data,      
      httpOptions
    )
    .pipe(retry(3));
}
deleteCountry(id: any): Observable<any> {
  return this.http
    .delete<any>(this.deleteCountryUrl + id, httpOptions)
    .pipe(retry(3));
}

/////////////////////////////cities

getAllCities(): Observable<any[]> {

  return this.http.get<any[]>(this.getAllCitiesUrl).pipe(retry(3));
}
getCityById(id): Observable<any[]> {
  return this.http.get<any[]>(this.getCityByUrl+ id, httpOptions).pipe(retry(3));
}
createCity(data): Observable<any> {
  return this.http
    .post<any>(this.createCityUrl, data, httpOptions)
    .pipe(retry(3));
}
editCity(id: any, data): Observable<any> {
  return this.http
    .put<any>(this.editCityUrl + id,  data,      
      httpOptions
    )
    .pipe(retry(3));
}
deleteCity(id: any): Observable<any> {
  return this.http
    .delete<any>(this.deleteCityUrl + id, httpOptions)
    .pipe(retry(3));
}

//////////////////////projects
getAllProjects(): Observable<any[]> {
  
  return this.http.get<any[]>(this.getAllProjectsUrl).pipe(retry(3));
}
getProjectById(id): Observable<any[]> {
  return this.http.get<any[]>(this.getProjectByIdUrl+ id, httpOptions).pipe(retry(3));
}
createProject(data): Observable<any> {
  return this.http
    .post<any>(this.createProjectUrl, data, httpOptions)
    .pipe(retry(3));
}
editProject(id: any, data): Observable<any> {
  return this.http
    .put<any>(this.editProjectUrl + id,  data,      
      httpOptions
    )
    .pipe(retry(3));
}
deleteProject(id: any): Observable<any> {
  return this.http
    .delete<any>(this.deleteProjectUrl + id, httpOptions)
    .pipe(retry(3));
}

}



