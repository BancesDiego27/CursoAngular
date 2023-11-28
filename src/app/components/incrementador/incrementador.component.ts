import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  ngOnInit() {
   this.btnClass = `btn ${ this.btnClass }`;
  }
  @Input() progreso : number = 35; // Se puede renombrar como @Input('Nombre_renombrar')
  @Input() btnClass : string = 'btn-primary';
  @Output() valorSalida : EventEmitter<number> = new EventEmitter()
  get getPorcentaje(){
    return `${this.progreso}%`;
  }

  cambiarValor(valor : number ){
    if(this.progreso >= 100 && valor >= 0){
      this.valorSalida.emit(100)
      return this.progreso = 100
    }
    if(this.progreso <= 0 && valor < 0){
      this.valorSalida.emit(0)
      return this.progreso = 0
    }
    this.valorSalida.emit(this.progreso +valor)
    return this.progreso = this.progreso + valor
  }
  onChange(nuevoValor : number ){
    if(nuevoValor >= 100){
      console.log("hi")
      this.progreso = 100
      //this.valorSalida.emit(this.progreso)
    }else if(nuevoValor <= 0 ){
      console.log("hi2")
      this.progreso = 0
      //this.valorSalida.emit(this.progreso)
    }else{
      this.valorSalida.emit(this.progreso)
    }
    

  }
}
