import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {FbResponse, Product} from "./interfaces";
import {Observable} from "rxjs";




@Injectable({
  providedIn: 'root'
})
export class ProductService {
  type = 'Woman'

  constructor(private http : HttpClient) {}


  create(product:any){

    return this.http.post(`${environment.fbDbUrl}/products.json`, product)
    .pipe( map((res: any) => ({
      ...product,
      id: res.name,
      date: new Date(product.date)

    })))
  }

  getAll(): Observable<Array<any>>{
    return this.http.get<Array<any>>(`${environment.fbDbUrl}/products.json`)
      .pipe(map((res:any) => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)

          }))
      }))
  }
  getById(id: { id: any }){
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(map((res:any ) => {
        return  {
          ...res,
          id,
          date: new Date(res.date)

        }
      }))
  }
  remove (id: { id: any }) {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`)
  }

  update(product:Product) {
    return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product)
  }
  setType(type:any){
    this.type = type
  }

}

