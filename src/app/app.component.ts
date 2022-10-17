import { Component } from '@angular/core';
import { LoaderService } from './common/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoader:boolean = false
  flag = true
  loadingFlag= false
  title = 'front-end';
  constructor(private loadService: LoaderService){}
  setLoading(value: boolean = false) {
    console.log("valueeee",value)
    this.loadingFlag = value
  }
  ngAfterViewInit() {
    this.loadService.getShowLoader().subscribe(showLoader => {
        setTimeout(() => {
            this.showLoader = showLoader;
        }, 100);
    });
}
}


