import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  menuItems: any[] = []
  public usuario: Usuario
constructor(private sidebarServices: SidebarService,private usuarioService : UsuarioService){
  this.menuItems = this.sidebarServices.menu
  this.usuario=usuarioService.usuario
}
}
