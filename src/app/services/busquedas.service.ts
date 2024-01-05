import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient){ }
  get token() :string{
    return localStorage.getItem('token') || ''
  }

  private transformarUsuarios(res : any[]):Usuario[]{

    return res.map(user=>
      new Usuario(user.nombre,user.email,'',user.imagen,user.google,user.role,user.uid))
  }

  buscar(tipo:'usuarios'|'hospitales'|'medicos',terminobusqueda:string){
    return this.http.get(`${base_url}/todo/coleccion/${tipo}/${terminobusqueda}`,{
      headers:{
        'x-token' :   this.token
      }
    }).pipe(
      map((res:any) =>{
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(res.resultado)
          default:
            return []
        }
      })
    )
  }

}
