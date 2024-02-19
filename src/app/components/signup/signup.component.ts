import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  @ViewChild('signUpForm') signUpForm!: NgForm;
  user = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  signUp() {
    // Verificar la existencia del usuario antes de intentar registrarlo
    this.authService.checkUserExists(this.user.email).subscribe(
      (res) => {
        if (!res.exists) {
          // El usuario no existe, procede con el registro
          this.authService.signUp(this.user).subscribe(
            (res) => {
              // console.log(res);
              localStorage.setItem('token', res.token);
              this.router.navigate(['/private-tasks']);
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Usuario registrado exitosamente',
                showConfirmButton: false,
                timer: 1500,
              });
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          // El usuario ya existe, muestra un mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El correo electrónico ya está registrado. Inicia sesión en lugar de registrarte.',
          });
          this.signUpForm.resetForm();

        }
      },
      (err) => {
        console.error(err);
        // Manejar errores de verificación del usuario
      }
    );
  }
}
