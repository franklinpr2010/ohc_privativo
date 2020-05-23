import { environment } from '@environments/environment';
export class AtributoImagem {
    constructor(
        public hash: string,
        public ext: string,
        public mime: string,
        public width: string,
        public height: string,
        public size: string,
        public url: string
    ) {
       
    }

    
    fullUrl() {
        return environment.apiUrl + '/' + this.url;
    }
  

    public toString = () : string => { 
        console.log(environment.apiUrl + '/' + this.url);
        return environment.apiUrl + '/' + this.url;
    }
}
