import { Compl } from './compl.model';

export class Cadastro {

	constructor(
		public id: string,
		public username: string,
		public email: string,
		public password: string,
		public telefone: string,
		public texto: string) {}

}