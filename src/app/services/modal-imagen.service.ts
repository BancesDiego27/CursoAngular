import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private _ocultarModal: boolean = true
  public tipo :'usuarios'|'hospitales'|'medicos'
  public id : string = ''
  public img: string = ''
  public nuevaImg: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  get ocultarModal(){
    return this._ocultarModal
  }

  abrirModal(tipo:'usuarios'|'hospitales'|'medicos', id: string,img:string='no-image' ){
    this._ocultarModal= false
    this.tipo = tipo
    this.id = id
    //this.img = img
    if(img.includes('https')){
      this.img= img
    } else{
      this.img = `${base_url}/upload/${tipo}/${img}`
    }
    
  }
  cerrarModal(){
    this._ocultarModal= true
  }

}
