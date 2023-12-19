import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: ``
})
export class PerfilComponent implements OnInit {
public perfilForm:FormGroup ;
public usuario: Usuario;
public imagenSubir : File;
public imgTemp :any;


constructor(private fb: FormBuilder, private usuarioService: UsuarioService, 
  private fileUploadService: FileUploadService){
  this.usuario= this.usuarioService.usuario
}

ngOnInit() {
this.perfilForm = this.fb.group({
  nombre: [this.usuario.nombre,Validators.required],
  email: [this.usuario.email,[Validators.required,Validators.email]]
})
}

actualizarPerfil(){
  console.log(this.perfilForm.value)
  this.usuarioService.actualizarUsuario(this.perfilForm.value).subscribe((res:any) =>{
    const {nombre, email} = res.usuario
    this.usuario.nombre = nombre
    this.usuario.email = email
    Swal.fire('Exitoso', 'Usuario actualizado con exito', 'success')
  }, err => Swal.fire('Fallo',err.error.msg, 'error'))
}

actualizarFoto(){
  this.fileUploadService.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid).then(img => {
    this.usuario.imagen=img
    Swal.fire('Exitoso', 'Foto actualizada con exito', 'success')
  } ).catch(err =>Swal.fire('Fallo',err.error.msg, 'error'))
}

cambiarImagen(event){
  this.imagenSubir = event.target.files[0]
  if(!event.target.files[0]){return this.imgTemp= null}
  const reader = new FileReader();
  const url64 = reader.readAsDataURL(this.imagenSubir)

  reader.onloadend= () =>{
    this.imgTemp= reader.result
  }
}
}
