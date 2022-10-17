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
    mode: 'external',
    columns: {
      id: {
        title: 'ID',
        filter: false,
        editable: false,
        addable: false,
      },
      name: {
        title: 'Name',
        filter: false,
        // filterFunction(cell?:any, search?:string): boolean{
        //   return false

        // }
      },
    },
    actions: {
      columnTitle: 'Actions',
      add: true,
      edit: false,
      delete: true,
      custom: [
        { name: 'viewrecord', title: '<i class="fa fa-eye"></i>' },
        // { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      ],
      position: 'right'
    },
    add: {
      addButtonContent: '<i class="fa fa-plus"></i>',
      // createButtonContent: '<i class="fa fa-check"></i>',
      // cancelButtonContent: '<i class="fa fa-ban"></i>',
      // confirmCreate: true
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash"></i>'
    }
    // actions: false,
    // hideSubHeader: true
  }
  source: LocalDataSource;
  showData = false;
  constructor(private compenentHealperService: ComponentHelperService, private _router: Router) {
    this.source = new LocalDataSource();
  }

  ngOnInit(): void {
    this.getProducts()

  }

  // this.source
  getProducts(params?: any) {


    this.compenentHealperService.get("/Products/getall", params).subscribe(resp => {
      if (resp.body) {
        this.source.load(resp.body),
          this.showData = true;
      }
    }, error => {
      if (error.error.status = 401) {
        this.compenentHealperService.errorHandler(error)
      }

    })
  }


  onCustomAction($event) {
    this._router.navigate([`products/${$event['data']['id']}`]);
    //todo: 
    // make sure only exist id show content nothing else. 
  }

  onSearch(v) {
    let params = new HttpParams();
    params = params.set("name", v)
    this.getProducts(params)
  }

  onCreateConfirm($event) {
    this._router.navigate([`products/new`]);
  }

  onDelete($event) {
    Swal.fire({
      title: 'You sure want to delete product with id ' + $event['data'].id + ' ?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success')
        this.deleteProductById($event['data'].id);
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }
  deleteProductById(productIdForDeletion) {
    this.compenentHealperService.delete(`/products/delete/${productIdForDeletion}`).subscribe(resp => {
      if (resp.body) {
        Swal.fire({
          icon: 'success',
          title: "Product Successfully Deleted",
          text: "",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          } else if (result.isDismissed) {
            window.location.reload();
          }
        })
      }
    }, error => {
      this.compenentHealperService.errorHandler(error)
    })

  }


}


