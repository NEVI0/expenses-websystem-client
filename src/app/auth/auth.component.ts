import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

    private readonly AppUserData = environment.AppUserData;

    loginForm: FormGroup;
    signupForm: FormGroup;
    isLoading: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: [ null, [Validators.required, Validators.email] ],
            password: [ null, Validators.required ]
        });
        this.signupForm = this.formBuilder.group({
            name: [ null, Validators.required ],
            email: [ null, [Validators.required, Validators.email] ],
            password: [ null, [Validators.required, Validators.minLength(7)] ],
            conf_password: [ null, Validators.required ]
        });
    }

    onLogin() {
        this.isLoading = true;
        this.authService.login(this.loginForm.value).subscribe(
            resp => {
                this.isLoading = false;
                this.signupForm.reset();
                this.router.navigate(['/dash']);
                localStorage.setItem(this.AppUserData, JSON.stringify(resp));
            },
            err => {
                this.isLoading = false;

                if (err.error.message == undefined || err.error.message == null || err.error.message == '') {
                    this.snackbar.open("Ocorreu um error no Servidor! Tente mais tarde", "Ok", {
                        duration: 3500
                    });
                } else {
                    this.snackbar.open(err.error.message, "Ok", {
                        duration: 3500
                    });
                }
            }
        );

    }

    onSignup() {
        this.isLoading = true;
        this.authService.signup(this.signupForm.value).subscribe(
            resp => {
                this.isLoading = false;
                this.signupForm.reset();
                this.router.navigate(['/dash']);
                localStorage.setItem(this.AppUserData, JSON.stringify(resp));
            },
            err => {
                this.isLoading = false;

                if (err.error.message == undefined || err.error.message == null || err.error.message == '') {
                    this.snackbar.open("Ocorreu um error no Servidor! Tente mais tarde", "Ok", {
                        duration: 3500
                    });
                } else {
                    this.snackbar.open(err.error.message, "Ok", {
                        duration: 3500
                    });
                }
            }
        );
    }

    onForgotPass() {
        this.authService.forgotPass(this.loginForm.value.email).subscribe(
            resp => {
                this.snackbar.open(resp.message, "Ok", {
                    duration: 3500
                });
            },
            err => {
                console.log(err);
                this.snackbar.open(err.error.message, "Ok", {
                    duration: 3500
                });
            }
        )
    }

}
