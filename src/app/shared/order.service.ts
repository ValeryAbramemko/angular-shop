 import { Injectable } from '@angular/core';
 import {HttpClient} from "@angular/common/http";
 import {environment} from "../../environments/environment";
 import {map} from "rxjs/operators";
 import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) {}


  create(order:any){

    return this.http.post(`${environment.fbDbUrl}/orders.json`, order)
      .pipe( map((res: any) => ({
        ...order,
        id: res.name,
        date: new Date(order.date)

      })))
  }

  getAll(): Observable<Array<any>>{
    return this.http.get<Array<any>>(`${environment.fbDbUrl}/orders.json`)
      .pipe(map((res:any) => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)

          }))
      }))
  }
  remove (id: { id: any }) {
    return this.http.delete(`${environment.fbDbUrl}/orders/${id}.json`)
  }
}
