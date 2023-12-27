import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any[] = [
    {
      id: 1,
      name: 'makeitglow',
      username: 'makeitglow',
      password: '123456'
    }
  ];
  session: any
  constructor(private router: Router) {
    let session: any = localStorage.getItem('session')
    if (session) {
      session = JSON.parse(session)
    }
    this.session = session;
  }

  login(username: string, password: string) {
    let users = this.user.find((u) => u.username === username && u.password === password)
    if (users) {
      this.session = users;
      localStorage.setItem('session', JSON.stringify(this.session))
    }
    return users;
  }

  logout() {
    this.session = undefined
    localStorage.removeItem('session')
    this.router.navigateByUrl('/')
  }
}
