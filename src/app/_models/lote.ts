import { Arquivo } from './arquivo';
import { Capitulo } from './capitulo';


export class Lote {

    constructor() {
       
    }
    id: number;
    numero: number;
    descricao: string;
    arquivo:Arquivo;
    capitulo: Capitulo;

}