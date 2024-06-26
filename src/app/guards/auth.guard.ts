import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsuarioService);
  const router = inject(Router);
 
  return userService.tokenValidation().pipe(
    tap((isAuthenticated: any) => {
      if (!isAuthenticated) {
        router.navigateByUrl('/login');
      }
    })
  );
};
