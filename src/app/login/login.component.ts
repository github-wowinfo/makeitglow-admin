import { ToastService } from './../toast.service';
import { ApiService } from './../api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NavbarService } from '../services/navbar.service';
// import { NgToastService } from 'ng-angular-popup'
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
  constructor(private apiService: ApiService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private navbarService: NavbarService) { }
  login() {
    const postData = {
      email: this.form.value.username,
      password: this.form.value.password,
    };
    console.log('postData', postData);

    this.apiService.createPost(postData).subscribe(
      (response) => {
        console.log('Post created successfully:', response.token);
        localStorage.setItem('token', response.token);
        this.toastService.showSuccess('Login successful!');
        this.router.navigateByUrl('/orders')

        // Optionally, you can handle the response or perform additional actions
      },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError('Login failed. Please check your credentials.');
        // Optionally, you can handle errors, show a message, etc.
      }
    );

  }
  ngOnInit(): void {
    this.navbarService.hide()
  }
  ngOnDestroy(): void {
    this.navbarService.display()
  }

}
