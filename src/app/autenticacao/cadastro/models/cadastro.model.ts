import { UsuarioCapitulo } from '@app/_models/usuariocapitulo';


export class Cadastro {

	constructor(
		public id: string,
		public username: string,
		public email: string,
		public password: string,
		public telefone: string,
		public texto: string,
		public confirmed: boolean = false,
		public nivel: number = 1,
		public lote: number = 1,
		) {}

}