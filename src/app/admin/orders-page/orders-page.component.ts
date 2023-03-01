import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {OrderService} from "../../shared/order.service";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit{

  orders: any[] = []
  pSub: Subscription | null = null;
  rSub: Subscription | null = null;
  productName:any
  constructor(
    private orderServ:OrderService
  ) {
  }

  ngOnInit() {
    this.pSub = this.orderServ.getAll().subscribe(orders => {
      this.orders = orders
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
    this.rSub = this.orderServ.remove(id).subscribe(() => {
      this.orders = this.orders.filter( order => order.id !== id)
    })
  }

}
