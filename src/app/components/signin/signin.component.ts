import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  @ViewChild('signInForm') signInForm!: NgForm;

  constructor(private authService: AuthService, private router: Router) {}

  user = {
    email: '',
    password: '',
  };

  signIn() {
    // Verificar la existencia del usuario antes de intentar iniciar sesión
    this.authService.checkUserExists(this.user.email).subscribe(
      (res) => {
        if (res.exists) {
          // Usuario existe, procede con el inicio de sesión
          this.authService.signIn(this.user).subscribe(
            (res) => {
              // console.log(this.user);
              localStorage.setItem('token', res.token);
              this.router.navigate(['/private-tasks']);
            },
            (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:
                  'Credenciales incorrectas, por favor intenta nuevamente',
              });
              this.signInForm.resetForm();
            }
          );
        } else {
          // Usuario no existe, muestra un mensaje o realiza la acción correspondiente
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'La cuenta que ingresaste, no existe, por favor registrate',
          });
          this.signInForm.resetForm();
        }
      },
      (err) => {
        console.error(err);
        // Manejar errores de verificación del usuario
      }
    );
  }
}
