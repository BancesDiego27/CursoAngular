import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }
  async actualizarFoto(archivo:File,tipo : 'usuarios'|'medicos'|'hospitales', id:string){
    try {
      const url = `${base_url}/upload/${tipo}/${id}`
      const formData = new FormData();
      formData.append('imagen', archivo)
      console.log(url)
      const res = await fetch(url,{
        method: 'PUT',
        headers:{
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      })
      const data_res = await res.json()
      console.log(data_res)
      if(data_res.ok){
        return data_res.nombreArchivo
      }else{
        console.log(data_res.msg)
        return false
      }


    } catch (error) {
      console.log(error)
      return false
    }
  }

}
