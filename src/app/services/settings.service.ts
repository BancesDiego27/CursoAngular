import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');
  constructor() { 
    const theme = localStorage.getItem('theme') || "./assets/css/colors/default-dark.css"
    // <link href="./assets/css/colors/default-dark.css" id="theme" rel="stylesheet">
    this.linkTheme?.setAttribute('href',theme)
  }
  changeTheme(theme: string){
 
    const urlTheme = `./assets/css/colors/${theme}.css`
    // <link href="./assets/css/colors/default-dark.css" id="theme" rel="stylesheet">
    this.linkTheme?.setAttribute('href',urlTheme)
    localStorage.setItem('theme', urlTheme)
    this.checkCurrentTheme()
  }
  checkCurrentTheme(){
  const selectorTheme = document.querySelectorAll('.selector')
    selectorTheme.forEach(elem =>{
      elem.classList.remove('working')
      const btnTheme = elem.getAttribute('data-theme')
      const urlTheme = `./assets/css/colors/${btnTheme}.css`
      const currentTheme = this.linkTheme?.getAttribute('href')
      if(currentTheme === urlTheme){
        elem.classList.add('working')
      }
    } )
  }
}
