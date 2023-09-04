import { Component, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service'; 
import { Factura } from 'src/app/facturas/models/factura';
import { FacturasService } from 'src/app/facturas/service/facturas.service';


@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {
 @Input() cliente: Cliente;
  titulo: string = "Detalle del cliente";
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor (private clienteService: ClienteService, 
               public facturaService: FacturasService,
               private activatedRoute:ActivatedRoute,
               public modalService: ModalService ){

  }

  ngOnInit(): void {

  }

  sleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      Swal.fire('Error, al seleccionar la imagen', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    } //indexof busca coincidencia con image
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      Swal.fire('Error Upload: ', 'Error, debe seleccionar una foto', 'error');

    }else{
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(event =>{
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total) * 100);
        }else if(event.type === HttpEventType.Response){
          let response: any = event.body;
          this.cliente = response.cliente as Cliente;
          this.modalService.notificarUpload.emit(this.cliente); //emitimos el cliente actualiado
          Swal.fire('La foto se ha subido correctamente', response.mensaje, 'success');
        }
      });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

  delete(factura: Factura): void{

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que deses eliminar esta factura ${factura.descripcion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelalo!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.facturaService.delete(factura.id).subscribe(response => {
          this.cliente.facturas = this.cliente.facturas.filter(fact => fact !== factura)
          swalWithBootstrapButtons.fire(
            'Factura eliminada',
            `Factura ${factura.descripcion} eliminada con éxito`,
            'success'
          )
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La factura no ha sido eliminada',
          'error'
        )
      }
    })
  }
}
