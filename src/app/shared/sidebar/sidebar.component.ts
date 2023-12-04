import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  menuItems: any[] = []
constructor(private sidebarServices: SidebarService){
  this.menuItems = this.sidebarServices.menu
  console.log(this.menuItems)

}
}
