import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
declare function customInitFunca() :any;
  
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  constructor(private settingsServices: SettingsService){}
  
  ngOnInit(): void {
    customInitFunca() 
  
  }

}
