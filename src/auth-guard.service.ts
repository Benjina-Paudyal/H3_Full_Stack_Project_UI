import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiredRole = next.data['role'] as string;

    if (this.authService.hasRole(requiredRole)) {
      return true;
    } else {
      // Redirect to unauthorized page or login page
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
