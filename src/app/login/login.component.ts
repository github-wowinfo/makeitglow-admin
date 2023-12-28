import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private navbarService: NavbarService) { }
  login() {
    let user = this.authService.login(this.form.value.username, this.form.value.password)
    if (!user) {
      alert('Invalid Username and Password')
    } else {
      this.router.navigateByUrl('/dashboard')
    }

  }
  ngOnInit(): void {
    this.navbarService.hide()
  }
  ngOnDestroy(): void {
    this.navbarService.display()
  }

}
