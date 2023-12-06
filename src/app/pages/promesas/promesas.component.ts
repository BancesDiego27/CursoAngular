import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit{
ngOnInit(): void {
  this.getUsuario().then(usuarios => console.log(usuarios))
  /*
  const promesa = new Promise((resolve,reject)=>{
    if(true){
      resolve("holamundo ")
    }else{
      reject("holi")
    }
   });

   promesa.then((mensaje)=>{
    console.log(mensaje)
   }).catch((error)=>
    console.log(error)
   )
   console.log("hola")*/

}
getUsuario(){
  return new Promise(resolve =>{
    fetch('https://reqres.in/api/users').then(resp => resp.json())
    .then(body => resolve(body.data))
    
  });
 // tambien guardandolo como variable const = promesa y return de promesa
}
}
