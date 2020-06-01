import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';

import { Cadastro } from '../models/cadastro.model';
import { Observable } from 'rxjs/internal/Observable';
import { Compl } from '../models/compl.model';
import { UsuarioCapitulo } from '@app/_models/usuariocapitulo';
import { User } from '@app/_models/user';
declare var Email: any;


@Injectable()
export class CadastrarService {

  private readonly PATH: string = 'users';
  private readonly PATH_NIVEL: string = 'usuario-capitulos';

  constructor(private http: HttpClient) { }

  cadastrar(cadastro: Cadastro): Observable<any> {

  	  return this.http.post(env.apiUrl + '/' + this.PATH, cadastro);
  }

  cadastrarNivel(usuario: UsuarioCapitulo) : Observable<any> {
    return this.http.post(env.apiUrl + '/' + this.PATH_NIVEL, usuario);

  }

  enviarEmail(cadastro: Cadastro) {
    //Enviando para os donos do site
    Email.send({
      Host : 'smtp.gmail.com',
      Username : 'hermeticordercaibalion@gmail.com',
      Password : 'gdrc8$roza',
      To : 'hermeticordercaibalion@gmail.com',
      From : 'hermeticordercaibalion@gmail.com',
      Subject : 'Novo Usuário',
      Body : `
      <i>Mensagem de novo usuário.</i> <br/> <b>Name: </b>${cadastro.username} <br /> <b>Email: </b>${cadastro.email}<br /> <b>Subject: </b>Novo Usuário<br /> <b>Message:</b> <br /> ${cadastro.texto} <br><br> <b></b> `
      });
      //Enviando para o futuro membro
      Email.send({
        Host : 'smtp.gmail.com',
        Username : 'hermeticordercaibalion@gmail.com',
        Password : 'gdrc8$roza',
        To : cadastro.email,
        From : 'hermeticordercaibalion@gmail.com',
        Subject : 'Hermetic Order Caibalion',
        Body : `Em breve retornaremos sobre sua candidatura aos estudos hermeticos!
           `
        });
  }

}


