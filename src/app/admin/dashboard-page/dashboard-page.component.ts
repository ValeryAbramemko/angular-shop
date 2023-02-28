import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../shared/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent  implements OnInit{

  products: any[] = []
  pSub: Subscription | null = null;
  rSub: Subscription | null = null;
  productName:any
  constructor(
    private productServ:ProductService
  ) {
  }

  ngOnInit() {
    this.pSub = this.productServ.getAll().subscribe(products => {
      console.log(products)
      this.products = products
    })
  }
  ngOnDestroy(){
    if(this.pSub){
      this.pSub.unsubscribe()
    }
    if(this.rSub){
      this.rSub.unsubscribe()
    }
  }
  remove(id : {id:any}){
    this.rSub = this.productServ.remove(id).subscribe(() => {
      this.products = this.products.filter( product => product.id !== id)
    })
  }

}
