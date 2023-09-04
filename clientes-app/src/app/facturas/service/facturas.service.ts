import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  public urlEndPoint: string = 'http://localhost:8080/api/facturas';

  constructor(public http: HttpClient) { }

  getFactura(id:number): Observable<Factura>{
    console.log('http//localhost:8080/api/facturas');
    return this.http.get<Factura>(this.urlEndPoint + '/' + id); //esto es una forma y (`${this.urlEndPoint}/${id}`) esto es otra forma                               
  }

  delete(id:number): Observable<void>{
    return this.http.delete<void>(this.urlEndPoint + '/' + id);
  }

  filtrarProductos(term: string): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlEndPoint + '/filtrar-productos' + '/' + term);
  }

  create(factura: Factura): Observable<Factura>{
    return this.http.post<Factura>(this.urlEndPoint, factura);
  }
}
