import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserRoleSubject = new BehaviorSubject<string>(''); // default role is an empty string
  public currentUserRole = this.currentUserRoleSubject.asObservable();

  constructor() { }
  setRole(role: string) {
    this.currentUserRoleSubject.next(role);
}

hasRole(requiredRole: string): boolean {
  const userRole = this.currentUserRoleSubject.value;
  // You may need to implement a more sophisticated role comparison logic based on your needs
  return userRole === requiredRole;
}
}
