import { Component } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute, Router,  } from '@angular/router';
import { Observable, map, mergeMap, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FacturasService } from './service/facturas.service';
import { Producto } from './models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemsFactura } from './models/items-factura';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent {

  titulo: string = "Nueva factura";
  factura: Factura = new Factura();
  myControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(private clienteService: ClienteService,
              private router: Router,  
              private facturaService: FacturasService,
              private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente);
    });

    this.productosFiltrados = this.myControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value: value.nombre), //convertir el valor del producto en un string
      mergeMap(value => value ? this._filter(value): [])
    );
  }

  private _filter(value: string):Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    return this.facturaService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined { //con ? ese parametro es opcional, puede ir o no
    return producto? producto.nombre:undefined; // preguntamos si existe el producto
  } 

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto; //optenemos el producto seleccionado a traves del objeto event y hay que convertir ese objeto generico a un producto
    console.log(producto);

    if(this.existeItem(producto.id)){
      this.incrementaCantidad(producto.id);
    }
    else{
      let nuevoItem = new ItemsFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem) //push nos deja añadir 
    }
    this.myControl.setValue('');
    event.option.focus();
    event.option.deselect(); //deseleccionamos un item
  }

  actualizarCantidad(id:number, event: any): void {
    let cantidad: number = event.target.value as number;
    if(cantidad == 0){
      return this.eliminarItemFactura(id);
    }

    this.factura.items = this.factura.items.map((item: ItemsFactura) => {  //ahora buscamos en este array este item de facturas a través del id del producto y le actualizamos la cantidad
      if(id === item.producto.id){
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id:number): boolean{
    let existe = false;
    this.factura.items.forEach((item: ItemsFactura) => {
      if(id === item.producto.id){
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id:number): void{
    this.factura.items = this.factura.items.map((item: ItemsFactura) => {  //ahora buscamos en este array este item de facturas a través del id del producto y le actualizamos la cantidad
      if(id === item.producto.id){
        item.cantidad++;
      }
      return item;
    });
  }

  eliminarItemFactura(id:number): void{
    this.factura.items = this.factura.items.filter((item: ItemsFactura) => id !== item.producto.id);
  }

  create(facturasForm): void{
    console.log(this.factura);
    if(this.factura.items.length == 0){
      this.myControl.setErrors({'invalid':true});
    }
    if(facturasForm.form.valid && this.factura.items.length > 0){
      this.facturaService.create(this.factura).subscribe(factura => {
        console.log(factura);
        Swal.fire(
          this.titulo, 
          `Factura ${factura.descripcion} creada con éxito!`, 
          'success');
        this.router.navigate(['/clientes']);
      });
    } 
  }
}
