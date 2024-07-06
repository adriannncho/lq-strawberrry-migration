import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenu {

  width = window.innerWidth;
  isCollapsed = false;

  /**
   * Escucha los eventos del cambio del ancho de la pantalla y asigna el valor de width
   * @param event Evento con los cambios en el ancho de la pantallla
   */
  @HostListener('window:resize', ['$event'])onResize(event: Event) {
    if(event.target instanceof Window) {
      this.width = event.target.innerWidth;
    }
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
