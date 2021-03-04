import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts'

  private apikey = 'AIzaSyCBA-s_GbHXtU4ryrNFUluBK4r6DtSPuYQ';
  userToken: string;
// crear nuevos usuarios
//https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

//login
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor(
    private http:HttpClient
  ) { this.leerToken();}
  logout(){

  }

  login(usuario:UsuarioModel){
    const authdata = {
      ...usuario,
      returnSecureToken: true 

    }
    return this.http.post(
      `${this.url}:signInWithPassword?key=${this.apikey}`, authdata).pipe(// el pipe lo aplicamos aquí para poder 
                                                                //guardar el idToken que viene del posteo
                                                                // mandado a FireBase
          
        map (resp =>{ //el map se ejecuta sólo sí el posteo no tiene ningún error.
          console.log('entro en el mapa de RXJS');
          this.guardarToken(resp['idToken']); // aquí ejecuto el método que lena la variable userToken
                                               // con el idToken, se hace usando localstorage.setitem
          return resp;
        })

      )

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
        `${this.url}:signUp?key=${this.apikey}`, authdata).pipe(
          
          map (resp =>{ // cabe aclarar que resp contiene toda la información del posteo
            console.log('entro en el mapa de RXJS');
            this.guardarToken(resp['idToken']); // aquí en particular entramos al "campo" 'idToken' de
                                                //infromación del posteo.
            return resp;
          })

        );

  }
  private guardarToken (idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token',idToken);

  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else{
      this.userToken = ''
    }
    return this.userToken;
  }
}
