import { Imagem } from './imagem';
import { UsuarioCapitulo } from './usuariocapitulo';
import { Lote } from './lote';
import { Post } from './post';

export class Capitulo {

    constructor() {
       
    }
    id: number;
    titulo: string;
    subtitulo: string;
    resumo: string;
    cor: string;
    link: string;
    imagem:Imagem;
    usuario_capitulos?: UsuarioCapitulo[];
    lotes: Lote[];
    posts: Post[];

}

