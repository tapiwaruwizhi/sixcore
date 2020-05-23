import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {
  private data:any = {};
  
  constructor() { }

setData(option, value) {  
  this.data[option] = value;  
}  
  getData() {  
    return this.data;  
  }  
 

clearData() {
    this.data.next();
}


}
