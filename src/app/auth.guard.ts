import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.loggedIn().pipe(
      take(1),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/signin']); // Redirige a la página de inicio de sesión si no está autenticado
        }
      })
    );
  }
}
