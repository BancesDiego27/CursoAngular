import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { ModalImagenComponent } from 'src/app/components/modal-imagen/modal-imagen.component';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0
  public Usuarios:Usuario[] =[]
  public UsuariosTemp:Usuario[] =[]
  public paginaActual :number= 0
  public cargando : boolean =true
  public imgSubs : Subscription;
  constructor(private usuariosService: UsuarioService, private busquedaServices: BusquedasService
    ,private imagenModalService: ModalImagenService) {}



  ngOnInit(): void {

    this.cargarUsuarios()
    this.imgSubs= this.imagenModalService.nuevaImg.pipe(delay(200))
    .subscribe(img=>{
      console.log(img)
      this.cargarUsuarios()
      console.log("termino")
    })
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  cargarUsuarios(){
    this.cargando = true
    this.usuariosService.cargarUsuarios(this.paginaActual).subscribe((res:any)=>{
      this.totalUsuarios= res.total
      this.Usuarios=res.usuarios
      this.UsuariosTemp = res.usuarios
      this.cargando=false
    })
  }
  cambiarPagina(valor:number){
    this.paginaActual += valor
    if(this.paginaActual <0){
      this.paginaActual = 0
    }
    else if(this.paginaActual > this.totalUsuarios){
      this.paginaActual -= valor
    }
    this.cargarUsuarios()
  }
  buscar(terminobusqueda:string){
    if(terminobusqueda.length ===0){
      this.Usuarios = this.UsuariosTemp
      return
    }
    this.busquedaServices.buscar('usuarios',terminobusqueda).subscribe(res=>{
      this.Usuarios = res
    })
  }

  eliminarUsuario(usuario: Usuario){
    if(this.usuariosService.uid === usuario.uid){
      Swal.fire({
        title: "Error",
        text: `No puede borrarse a si mismo`,
        icon: "error"
      })
      return;
    }
  Swal.fire({
    title: "¿Borrar Usuario?",
    text: `Esta a punto de borrar a ${usuario.nombre} `,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Si,Borrarlo"
  }).then((result) => {
    if (result.isConfirmed) {
      this.usuariosService.eliminarUsuario(usuario).subscribe(res=>{
        this.cargarUsuarios()
        return Swal.fire({
          title: "¡Eliminado!",
          text: `El usuario ${usuario.nombre} ha sido eliminado`,
          icon: "success"
        });

      })
    }

  });
  }

  cambiarRol(usuario:Usuario){
    this.usuariosService.guardarRol(usuario).subscribe(resp =>{
      console.log(resp)
    })
  }

  abrirModal(usuario:Usuario){
   this.imagenModalService.abrirModal('usuarios',usuario.uid,usuario.imagen)
  }
}
