import { Cliente } from "src/app/clientes/cliente";
import { ItemsFactura } from "./items-factura";

export class Factura {
    id: number;
    descripcion: string;
    observacion: string;
    items: Array<ItemsFactura> = [];
    cliente: Cliente;
    total: number;
    createAt: string;

    calcularTotal(): number {
        this.total = 0;
        this.items.forEach((item:ItemsFactura) => {
            this.total = this.total + item.calcularImporte();
        });
        return this.total;
    }
}
