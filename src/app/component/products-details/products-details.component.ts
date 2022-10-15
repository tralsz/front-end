import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  productUse = true
  constructor(private activeroute: ActivatedRoute,) { }
  productId: string;
  ngOnInit(): void {
    this.activeroute.params.subscribe(val => {
      this.productId = '';
      if (_.size(val) > 0) {
          this.productId = val.productId;
      }
  });

  if(this.productId == "2"){
    this.productUse = false;
  }

}


}
