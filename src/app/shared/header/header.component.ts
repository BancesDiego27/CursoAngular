import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
constructor(private usuarioService : UsuarioService){

  this.usuario=usuarioService.usuario
}

public usuario : Usuario
logOut(){
  this.usuarioService.logout();
}


}
