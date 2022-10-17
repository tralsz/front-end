import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { ComponentHelperService } from '../component-helper.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  productReadonly = true
  createNewProductFlag = false
  productEdit = {
    id:"",
    name:"",
    description: "",
    imageUrl:""
  }
  productOrigin = {
    id:"",
    name:"",
    description: "",
    imageUrl:""
  }
  createProduct = {
    name:"",
    description: "",
    imageUrl:""
  }
  imageUrlEdit: any;
  imageUrlOrigin: any;
  constructor(private activeroute: ActivatedRoute, private compenentHealperService: ComponentHelperService,private _router: Router) { }
  productId: string = null; 
  ngOnInit(): void {
    this.activeroute.params.subscribe(val => {
      this.productId = '';
      if (_.size(val) > 0) {
        this.productId = val.productId;
        if(this.productId == 'new'){
          this.createNewProduct()
        }else{
          this.getProductById()
        }
        
        return;
      }
    });


    
  }
  createNewProduct() {
    this.createNewProductFlag = true
    this.productReadonly = false;

  }
  getProductById() {
    
    this.compenentHealperService.get(`/products/getall/${this.productId}`).subscribe(resp=>{
      if(resp.body){
        this.productEdit = _.cloneDeep(resp.body)
        this.productOrigin =_.cloneDeep(resp.body)
        this.imageUrlEdit =_.cloneDeep(resp.body.imageUrl)
        this.imageUrlOrigin = _.cloneDeep(resp.body.imageUrl);

      }
    },error=>{
      this.compenentHealperService.errorHandler(error)
    })
  }
  deleteProduct(){
    // document.querySelector('#from1').onsubmit = function(e){
      Swal.fire({
        title: 'You sure want to delete product with id ' + this.productId + ' ?',
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
          this.deleteProductById();
        } else if (result.isDenied) {
          // Swal.fire('Changes are not saved', '', 'info')
        }
      })
  }
  deleteProductById() {
    console.log("product Deleted")
  }
  editProduct(){
    this.productReadonly = false

  }

  CancelEdit(){
    if(!this.createNewProductFlag){
      this.productReadonly = true
      this.productEdit = _.cloneDeep(this.productOrigin)
    }else{
      this.backToProduct()
    }
   

  }

  saveProduct(){
    // this.productOrigin = this.productEdit
    if(!this.createNewProductFlag){
      this.compenentHealperService.post(`/products/edit/${this.productEdit.id}`,this.productEdit).subscribe(resp=>{
        if(resp.body){
          this.compenentHealperService.alert('success',"Product Updated","")
          this.productReadonly = true
        }
      },error=>{
        this.compenentHealperService.errorHandler(error)
      })
    }else{
      this.createProduct.name = this.productEdit.name;
      this.createProduct.description = this.productEdit.description;
      this.createProduct.imageUrl = this.productEdit.imageUrl;

      this.compenentHealperService.post('/products/add',this.createProduct).subscribe(resp=>{
        if(resp.body){
          this.compenentHealperService.alert('success',"Added",resp.body)
          this.backToProduct();
        }
      },error=>{
        this.compenentHealperService.errorHandler(error)
      })

    }
    

  }
  backToProduct(){
    this._router.navigate(["products"])
  }

  disableSaveButton(){
    return (this.productEdit.name == '')
  }
}
