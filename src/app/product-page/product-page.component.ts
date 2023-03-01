import {Component, OnInit} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements  OnInit{
  product$:Observable<any>  = this.route.params
    .pipe(switchMap(params =>{
      return this.productServ.getById(params['id'])
    }))

  constructor(

  private  productServ: ProductService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
 // this.product$ = this.route.params
    //.pipe(switchMap(params =>{
     // return this.productServ.getById(params['id'])
   // }))
  }
  addProduct(product:any){
    this.productServ.addProduct(product);
  }

}
