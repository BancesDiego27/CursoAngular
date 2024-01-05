import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/registerForm.interfaces';
import { environment } from 'src/environments/environment.development';
import { LoginForm } from '../interfaces/loginForm.interfaces';
import {catchError,  map, tap} from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
const base_url = environment.base_url;
declare const google : any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  get token() :string{
    return localStorage.getItem('token') || ''
  }

  get uid():string{
    return this.usuario.uid || ''
  }
  constructor(private http: HttpClient,private router: Router,private ngZone: NgZone) { }
  public usuario: Usuario

  crearUsuario(formData:RegisterForm){
    console.log(formData)
    return this.http.post(`${base_url}/usuarios`,formData)
  }

  actualizarUsuario(formData){
    formData.role = this.usuario.role
    console.log(formData)
    return this.http.put(`${base_url}/usuarios/${this.uid}`,formData,{
      headers:{
        'x-token' :   this.token
      }
    }
    )
  }

  loginUsuario(formData:LoginForm){
    
    return this.http.post(`${base_url}/login`,formData).pipe(tap((resp:any) =>{
      localStorage.setItem('token',resp.token)
    }))
  }

  loginGoogle(token:string){
    
    return this.http.post(`${base_url}/login/google`,{token}).pipe(tap((resp:any) =>{
      localStorage.setItem('token',resp.token)
    }))
  }
  tokenValidation():Observable<Boolean>{
    //const token = localStorage.getItem('token') || ''

    return this.http.get(`${base_url}/login/renovar`,{
      headers:{
        'x-token' : this.token
      }
    }).pipe(
      map((resp:any) =>{
      const {email,google,nombre,role,uid,imagen=''} = resp.Usuario
      this.usuario = new Usuario(nombre,email,'',imagen,google,role,uid)
      localStorage.setItem('token',resp.token)
      return true

    }),
    catchError(erro => of(false))
    )
  }
  logout(){
    localStorage.removeItem('token')
    google.accounts.id.revoke(this.usuario.email,()=>{
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })

    })
  }
  cargarUsuarios(desde:number=15){
    // http://localhost:3000/api/usuarios?desde=5
    return this.http.get(`${base_url}/usuarios?desde=${desde}`,{
      headers:{
        'x-token' :   this.token
      }
    }).pipe(
      map((resp:any) =>{
      const usuarios = resp.usuarios.map(user=> 
        new Usuario(user.nombre,user.email,'',user.imagen,user.google,user.role,user.uid)
        )
        return {
          total: resp.total,
          usuarios
        }
    }))
  }

  eliminarUsuario(usuario: Usuario){
    //http://localhost:3000/api/usuarios/65735954cd3f89b994e42859
    
   return this.http.delete(`${base_url}/usuarios/${usuario.uid}`,{
      headers:{
        'x-token' :   this.token
      }
    })

  }

  guardarRol(formData:Usuario){
   const uid = formData.uid
    return this.http.put(`${base_url}/usuarios/${uid}`,formData,{
      headers:{
        'x-token' :   this.token
      }
    }
    )
  }
}
