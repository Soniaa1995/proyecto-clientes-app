import { Injectable } from '@angular/core';
//import { formatDate } from '@angular/common';
//import { DatePipe } from '@angular/common';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Region } from './region';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient, private router: Router) { }

  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }

  getClientes(page: number): Observable<any[]> { //ponemos any para que sea genérico
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint + '/page/' + page).pipe(
      tap( (response: any) =>{ //que la respuesta sea cualquier tipo de dato
        //console.log("TAP 1");
        (response.content as Cliente[]).forEach(cliente => { //hacemos un cast (conversion de tipos de datos)
          //console.log(cliente.nombre);
        }
        );
      }),
      map( (response: any) => { //en el map hacemos la conversion a clientes, se encarga de transformar 
         (response.content as Cliente[]).map(cliente =>{
          cliente.nombre = cliente.nombre.toUpperCase(); //se modifica a mayuscula
          //cliente.createAT = formatDate(cliente.createAT, 'dd-MM-yyyy', 'en-US'); //peta al poner la hora
          /*let datePipe = new DatePipe('en-US');
          cliente.createAT = datePipe.transform(cliente.createAT, 'dd/MM/yyyy');*/ // tampoco funsiona
          return cliente;
          //retornar objeto modificado
        });
        return response;
      }),
      tap(response =>{
        //console.log("TAP 2");
        (response.content as Cliente[]).forEach(cliente => {
          //console.log(cliente.nombre);
        }
        )
      })
    );
  }

  create(cliente: Cliente) :Observable<any> {
    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(() => e);
        }
        console.error(e.error.mensaje);
        //pasamos error al usuario:
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  getCliente(id) : Observable<Cliente>{
    //console.log("get cliente")
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(() => e);
        }
        console.error(e.error.mensaje);
        //pasamos error al usuario:
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        //pasamos error al usuario:
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo); 
    formData.append("id", id);
    
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });
    
    return this.http.request(req);
  }

}
