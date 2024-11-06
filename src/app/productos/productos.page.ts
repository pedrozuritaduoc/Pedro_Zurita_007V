import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicio/producto/producto.service';
import { Producto } from '../interfaces/Producto';
import { ViewWillEnter, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';

//para cerrar sesion
import { AuthService } from '../servicio/auth/auth.service';
import { Router } from '@angular/router';

//para el infinite scroll
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements ViewWillEnter, ViewDidLeave {
  public productos: Producto[] = [];
  private subProducto!: Subscription;
  public totalProductos: number = 0;
  
  constructor(
    private prdS: ProductoService,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ionViewDidLeave(): void {
    if(this.subProducto){
      this.subProducto.unsubscribe();
    }
  }

  ionViewWillEnter(): void {
    this.subProducto = this.prdS.producto.subscribe(productos => {
      this.productos = productos;
      this.totalProductos = this.prdS.total;
    });
    this.prdS.listarProductos();
  }

  
  
  cerrarSesion() {
    this.authService.cerrarSesion();
  }

//para el infinite scroll
onIonInfinite(event: InfiniteScrollCustomEvent) {
  if (this.productos.length < this.totalProductos) {
    this.prdS.siguientesProductos();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  } else {
    event.target.disabled = true; // Deshabilitar el infinite scroll cuando todos los productos estén cargados
  }
}




}
