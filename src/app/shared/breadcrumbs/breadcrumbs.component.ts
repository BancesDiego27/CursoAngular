import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo:string = '';
  public tituloSub$:Subscription = new Subscription;
  constructor(private router:Router) {
    this.tituloSub$= this.getArgumentosRuta().subscribe(({titulo})=>{
      this.titulo = titulo
      document.title = `AdminPro - ${titulo}`
    });
   }
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }

   getArgumentosRuta(){
    return this.router.events
    .pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild === null ),
      map((event:ActivationEnd) => event.snapshot.data)
    )
   }
  }
