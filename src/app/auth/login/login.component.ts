import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UsuarioService } from 'src/app/services/usuario.service';
declare const google:any;
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements AfterViewInit {
  constructor(private Router: Router,private fb: FormBuilder,private usuarioService: UsuarioService){ }
  @ViewChild('googleBtn') googleBtn!: ElementRef; 

  public loginForm:FormGroup = this.fb.group({
    email : [ localStorage.getItem('correo_recuerdame') || '', [Validators.email, Validators.required] ],
    password : ['', [Validators.required, Validators.minLength(6)]],
    recuerdame: [false]
  });

  ngAfterViewInit(){
    this.googleInit()
  }
googleInit(){
  google.accounts.id.initialize({
    client_id: "739962570324-elg1hvja144s8re125sgadvm83do035j.apps.googleusercontent.com",
    callback: (reposne: any) => this.handleCredentialResponse(reposne) 
});
google.accounts.id.renderButton(
    //document.getElementById("buttonDiv"),
    this.googleBtn.nativeElement,
    { theme: "outline", size: "large" }  // customization attributes
    );
}
handleCredentialResponse(response:any,){

  this.usuarioService.loginGoogle(response.credential).subscribe(res =>{
    console.log({login:res})
    this.Router.navigateByUrl("/")
  
  })
}

login(){
  console.log(this.loginForm.value)
  if(this.loginForm.invalid){
    Swal.fire('Error', 'Datos invalidos', 'error')
    return;
  }
    this.usuarioService.loginUsuario(this.loginForm.value).subscribe((res:any)=>{
      console.log(res)
      if(this.loginForm.get('recuerdame')?.value){
        localStorage.setItem('correo_recuerdame',this.loginForm.get('email')?.value)
      }else{
        localStorage.removeItem('correo_recuerdame')
      }
      this.Router.navigateByUrl("/")
    },err => Swal.fire('Error', err.error.msg, 'error'))


}
}
