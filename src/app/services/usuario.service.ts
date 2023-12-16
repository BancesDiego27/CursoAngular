import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/registerForm.interfaces';
import { environment } from 'src/environments/environment.development';
import { LoginForm } from '../interfaces/loginForm.interfaces';
import {catchError, map, tap} from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
const base_url = environment.base_url;
declare const google : any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,private router: Router) { }

  crearUsuario(formData:RegisterForm){
    console.log(formData)
    return this.http.post(`${base_url}/usuarios`,formData)
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
    const token = localStorage.getItem('token') || ''

    return this.http.get(`${base_url}/login/renovar`,{
      headers:{
        'x-token' : token
      }
    }).pipe(tap((resp:any) =>{
      localStorage.setItem('token',resp.token)
    }),map( resp =>true),
    catchError(erro => of(false))
    )
  }
  logout(){
    localStorage.removeItem('token')
    google.accounts.id.revoke('diego.bances@galileo.edu',()=>{
      this.router.navigateByUrl("/login")
    })
  }
}
