import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  showLoader = new BehaviorSubject<boolean>(false);

  constructor() { }
  getShowLoader(){
    return this.showLoader
  }

  setShowLoader(value = false){
    this.showLoader.next(value);
  }
}
