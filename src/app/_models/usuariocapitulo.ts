import { Capitulo } from './capitulo';
import { User } from './user';

export class UsuarioCapitulo {

    constructor(
        public id: number,
        public obs: string,
        public user:Number,
        public capitulo: Number
        
        ) {

        }


}