import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsuarioModel} from "../models/usuario.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiKey = ''; // configuracion del proyecto

  userToken: string;

  constructor(public http: HttpClient) {
    this.readToken();
  }

  logOut() {
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,//destructura el objeto y lo concatena con lo que pide
      returnSecuretoken: true
    }
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,authData )
            .pipe( map(resp => {
                  console.log('Entro en el map');
                  this.saveToken( resp['idToken'] )
                  return resp; }) )
  }

  registrar(usuario: UsuarioModel) {
    const authData = {
      ...usuario,//destructura el objeto y lo concatena con lo que pide
      returnSecuretoken: true
    }
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, authData).
          pipe( map(resp => {
                console.log('Entro en el map');
                this.saveToken( resp['idToken'] )
                return resp; }) )
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  readToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }


  isAutenticate(): boolean {
   return this.userToken.length > 2;
  }


}
