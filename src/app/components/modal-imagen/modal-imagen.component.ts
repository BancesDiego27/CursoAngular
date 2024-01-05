import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: ``
})
export class ModalImagenComponent {
 
  public imagenSubir : File;
  public imgTemp :any;
  constructor(public modalImagenService: ModalImagenService, public fileUploadService: FileUploadService){}

  cerrarmodal(){
    this.imgTemp=null
    this.modalImagenService.cerrarModal();
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

  actualizarFoto(){
    const uid = this.modalImagenService.id
    const tipo = this.modalImagenService.tipo 
    this.fileUploadService.actualizarFoto(this.imagenSubir,tipo,uid).then(img => {
      Swal.fire('Exitoso', 'Foto actualizada con exito', 'success')
      this.modalImagenService.nuevaImg.emit(img)
      this.cerrarmodal()
    } ).catch(err =>Swal.fire('Fallo',err.error.msg, 'error'))
  }
}
