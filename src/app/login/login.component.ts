import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  loginForm: FormGroup;

  get username() { return this.loginForm.controls.username.value; }

  get password() { return this.loginForm.controls.password.value; }

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Log value of the form every time it changes
    this.loginForm.valueChanges.subscribe(console.log);
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.username, this.password)
        .subscribe(data => {

          console.log(data);

          if (data && data.token) {
            localStorage.setItem('TOKEN', data.token);
            this.router.navigate(['list-users']);
          }
        },
          error => {
            console.log(error);
            this.invalidLogin = true;
          });
    }
  }
}
