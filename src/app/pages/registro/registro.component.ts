import { Component, OnInit } from '@angular/core';
import {UsuarioModel} from "../../models/usuario.model";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordar = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordar = true;
    }
  }

  onSubmit(form: NgForm){
    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.auth.registrar(this.usuario).subscribe(data => {
      console.log(data);
      Swal.close();
      if (this.recordar) {
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.error(err.error.error.message);
      Swal.fire({
        icon: "error",
        title: 'Error al registrarse',
        text: err.error.error.message
      })
    })
  }


}
