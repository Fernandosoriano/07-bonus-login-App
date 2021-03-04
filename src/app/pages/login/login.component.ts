import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
// import swal from 'sweetalert';
// import Swal from 'sweetalert2';
import swal from 'sweetalert';
// import * as _swal from 'sweetalert';
// import { SweetAlert } from 'sweetalert/typings/core';

// const swal: SweetAlert = _swal as any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  usuario: UsuarioModel;
  

  constructor(private auth: AuthService) { 
    this.usuario = new UsuarioModel(); // inicializacion
  }

  ngOnInit() {
    
  }
  login (form: NgForm) {
    if(form.invalid){
      return;
    }
    swal("Espere por favor...");

    // Swal.fire({
    //   allowOutsideClick:false,
    // })
    // Swal.fire({
    //   allowOutsideClick: false,
    //   type: 'info',
    //   text: 'Espere por favor...'
    // });

    this.auth.login(this.usuario).subscribe(
      resp =>{
        console.log(resp);
      }, (err) => {
        console.log(err.error.error.message)

      }
    )
    // console.log('imprimi si el formulario es valido')
    // console.log('formulario enviado');
    // console.log(this.usuario);
    // console.log(form)
    
  }

}

