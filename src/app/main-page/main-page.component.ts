import {Component, OnInit} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements  OnInit{
   products$: Observable<Array<any>> = this.productServ.getAll();
  constructor(
    public productServ: ProductService,
  ) {}

  ngOnInit() {
    // this.products$ = this.productServ.getAll()
  }

}
