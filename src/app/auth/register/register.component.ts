import { Component } from '@angular/core';
import Swal from 'sweetalert2'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: [ '../login/login.component.css' ]
})
export class RegisterComponent {
  public formSubmited = false;
  public registerForm = this.fb.group({
    nombre: ['Diego',[Validators.required, Validators.minLength(3)]],
    email : ['testAngular@gmail.com', [Validators.email, Validators.required] ],
    password : ['123456', [Validators.required, Validators.minLength(6)]],
    password2 : ['123456', [Validators.required, Validators.minLength(6)]],
    terminos : [true, Validators.required]
  },{
    validators: this.passwordIguales('password','password2')
  });
  constructor(private fb: FormBuilder,private usuarioService: UsuarioService,private router:Router){}
  crearUsuario(){
    this.formSubmited = true;
    
    if(this.registerForm.invalid){
      return;
    }
    console.log("uwu") 
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(res=>{
      console.log(res)
      Swal.fire('Exitoso', 'Usuario Creado con exito', 'success')
      this.router.navigateByUrl('/login')
    },(err: any) => {
      Swal.fire('Error', err.error.msg, 'error')
    } )
  }

  campoNoValido(campo: string):boolean {
    if(this.registerForm.get(campo)?.invalid && this.formSubmited){
      return true
    }
    return false
  }
  aceptarTerminos(campo : string ):boolean{
   return !this.registerForm.get(campo)?.value && this.formSubmited;
  }
  passNoValido(){
    const pass1= this.registerForm.get('password')
    const pass2= this.registerForm.get('password2')
    return (pass1 === pass2) && this.formSubmited
  }
  passwordIguales(password:string , password2:string){
    return (formgroup : FormGroup) => {
      const pass1Control = formgroup.get(password);
      const pass2Control = formgroup.get(password2)

      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({noEsIgual: true})
      }
    }
  }
}
