import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inyecta el Router

  // Verifica si el usuario está autenticado
  const token = localStorage.getItem('token'); // Obtén el token del localStorage

  if (token) {
    // Si hay un token, el usuario está autenticado
    return true;
  } else {
    // Si no hay token, redirige al usuario a la página de inicio de sesión
    router.navigate(['/login']);
    return false;
  }
};