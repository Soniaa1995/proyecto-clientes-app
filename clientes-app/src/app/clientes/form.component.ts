import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
public cliente:Cliente = new Cliente();
public titulo:string = "Crear Cliente";
public regiones: Region[];
public errores: string[];

constructor(private clienteService: ClienteService,
            private router: Router,
            private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente);
      }
    })
  }


  create(): void{
    this.clienteService.create(this.cliente).subscribe(json => {
        this.router.navigate(['/clientes'])
        swal.fire(  'Cliente guardado',  `Cliente ${json.cliente.nombre} creado con éxito!`,  'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status); 
        console.error(err.error.errors); //opcional
      }
    )
  }

  update(): void{
    this.cliente.facturas == null;
    this.clienteService.update(this.cliente).subscribe(json =>{
      this.router.navigate(['/clientes']);
      swal.fire(  'Cliente actualizado',  `Cliente ${json.cliente.nombre} actualizado con éxito!`,  'success');
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: ' + err.status); 
      console.error(err.error.errors); //opcional
    }
    )
  }

  compararRegion(o1:Region, o2:Region): boolean {
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}


