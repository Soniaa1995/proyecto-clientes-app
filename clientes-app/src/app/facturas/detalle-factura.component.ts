import { Component } from '@angular/core';
import { FacturasService } from './service/facturas.service';
import { Factura } from './models/factura';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html'
})
export class DetalleFacturaComponent {

  factura: Factura;
  titulo: string = 'Factura';

  constructor (public facturasService: FacturasService, public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id'); //obtenemos el id y con el + lo convertimos a number
      this.facturasService.getFactura(id).subscribe(factura => this.factura = factura); //cone el id buscamos la factura y se le asigna al atributo
    });
  }

}
