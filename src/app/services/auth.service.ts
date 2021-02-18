import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts'

  private apikey = 'AIzaSyCBA-s_GbHXtU4ryrNFUluBK4r6DtSPuYQ';
// crear nuevos usuarios
//https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

//login
// https:identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]



  constructor(
    private http:HttpClient
  ) { }
  logout(){

  }

  login(usuario:UsuarioModel){

  }

  nuevoUsuario(usuario:UsuarioModel){
    // const authdata = {
    //   email: usuario.email,
    //   password: usuario.password,
    //   returnSecureToken: true
    //   };
//hay una forma de definir el objeto de una  manera más corta:
      const authdata = {
        ...usuario,
        returnSecureToken: true

      }
      return this.http.post(
        `${this.url}:signUp?key=${this.apikey}`, authdata);

  }
}
