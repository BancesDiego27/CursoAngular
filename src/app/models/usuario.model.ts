import { environment } from "src/environments/environment.development"

const base_url = environment.base_url
export class Usuario {
    constructor(
        public nombre : string,
        public email : string,
        public password?: string,
        public imagen?: string,
        public google? : boolean,
        public role? : string,
        public uid?: string,
        
    ){}
    get obtenerUrl(){
        if(this.imagen.includes('https')){
            return this.imagen
        }
        if(this.imagen){
            return `${base_url}/upload/usuarios/${this.imagen}`
        }else{
            return `${base_url}/upload/usuarios/no-image`
        }
    }
}