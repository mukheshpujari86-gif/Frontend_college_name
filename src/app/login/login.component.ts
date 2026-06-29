import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularAPIService } from '../API/angular-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private API: AngularAPIService
  ) {
    this.loginForm = this.fb.group({
      admin: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

  // console.log('Login form value:', this.loginForm.value);
  // console.log('Admin:', this.loginForm.value.admin);
  // console.log('Password:', this.loginForm.value.password);
    

    this.API.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('adminName', res.admin);
        localStorage.setItem('adminPassword', this.loginForm.value.password);
        localStorage.setItem('adminId', res.id);

        this.router.navigate(['/home']);
      },
      
      error: () => {
        this.errorMessage = 'Invalid admin or password';
      }
    });
  }

  signup() {
  this.router.navigate(['/Register']);
}
}