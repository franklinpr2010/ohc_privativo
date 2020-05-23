import { UsuarioCapitulo } from './usuariocapitulo';

export class User {

    constructor(
        public id: number,
        public username?: string,
        public firstName?: string,
        public lastName?: string,
        public blocked?: boolean,
        public email?: string,
        public nivel?: number,
        public telefone?: string,
        public token?: string,
        public cep?: string,
        public cidade?:string,
        public pais?: string,
        public endereco?: string,
        public texto?: string,
        public lote?: number,
        public usuario_capitulos?: UsuarioCapitulo[],
        public confirmed?: boolean
        ) {

        }


}


