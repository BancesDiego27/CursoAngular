import { Component, OnDestroy } from '@angular/core';
import { Observable, retry,interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs: Subscription = new Subscription;
constructor(){
  

 /*this.retornarObservable()
  .subscribe(valor => console.log("SUBS:",valor ), err => console.warn("Eror",err),()=>console.info("holi se acabo")); */

  this.intervalSubs= this.retornaIntervalo().subscribe(console.log)


  
}
  ngOnDestroy(): void {
   this.intervalSubs.unsubscribe()
  }
retornaIntervalo():Observable<number>{
  // en el map se puede hacer lo que sea con 
  // El orden de estp influye 
  return interval(500).pipe(map(valor => valor),filter( valor => (valor % 2 === 0 )?true:false),
  //take(10)
  )
  

}
retornarObservable(): Observable<number>{
  let i = -1;
  return new Observable<number>( observer =>{
    const intervalo = setInterval(()=>{
      i ++
      observer.next(i)
      if(i === 4){
        clearInterval(intervalo)
        observer.complete();
      }
      if(i === 2){
        observer.error("holis esto es un errors");
      }
    },1000)
  } );

}
}
