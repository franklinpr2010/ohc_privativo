import { Imagem } from './imagem';
import { Capitulo } from './capitulo';


export class Post {

    constructor() {
       
    }
    id: number;
    titulo: string;
    texto: string;
    imagem:Imagem;
    capitulo: Capitulo;
    nivel: Number;
    lote: Number;

}