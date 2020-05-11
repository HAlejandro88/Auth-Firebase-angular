import { Component, OnInit } from '@angular/core';
import {UsuarioModel} from "../../models/usuario.model";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  recordar = false;

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordar = true;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) { return; }

    //show/mostrar un loading con sweetAlert
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor ..'
    });
    Swal.showLoading();

    this._auth.login( this.usuario ).subscribe( user => {
      console.log(user);
      Swal.close();
      if (this.recordar) {
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');
    }, (error) => {
      console.error(error.error.error.message);
      Swal.fire({
        icon: "error",
        title: 'Error al autenticar',
        text: error.error.error.message
      })
    })

  }

}
