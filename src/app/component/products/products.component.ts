import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { LocalDataSource } from 'ng2-smart-table';
import { ButtonViewComponent } from '../button-view/button-view.component';
import { ComponentHelperService } from '../component-helper.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  settings = {

    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Name'
      },
      description: {
        title: 'Description'
      },
      // button: {
      //   title: 'Button',
      //   type: 'custom',
      //   renderComponent: ButtonViewComponent,
      //   onComponentInitFunction(instance) {
      //     instance.save.subscribe(row => {
      //       this.test(row)
      //       alert(`${row.name} saved!`)
      //     });
      //   }
      // },

    },
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
      { name: 'viewrecord', title: '<i class="fa fa-eye"></i>'},
      // { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
    ],
      position: 'right'
    },
    // actions: false,
    hideSubHeader: true
  }
  source: LocalDataSource;

  constructor(private compenentHealperService: ComponentHelperService,private _router: Router) {
    this.source = new LocalDataSource();
  }

  ngOnInit(): void {

    this.getProducts()
  }
  getProducts() {
    let params = new HttpParams()
    this.compenentHealperService.get("https://localhost:7030/Products/getall", params).subscribe(resp => {
      if (resp.body) {
        this.source.load(resp.body)
      }
    }, error => {
      if(error.error.status = 401){
        console.log(error.error)
        console.log(error.error.status)
        this.compenentHealperService.errorHandler(error)
      }

    })
  }


  onCustomAction($event){
    console.log("truee")
    console.log($event)
    console.log($event['data']['id'])

    this._router.navigate([`products/${$event['data']['id']}`]);
    //todo: 
    // make sure only exist id show content nothing else. 
  }


}


