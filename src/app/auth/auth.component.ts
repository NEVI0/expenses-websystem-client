import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

    loginForm: FormGroup;
    signupForm: FormGroup;
    isLoading: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
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
                localStorage.setItem("_application_user_data", JSON.stringify(resp));
            },
            err => {
                this.isLoading = false;
                console.log(err)
            }
        );

    }

    onSignup() {
        this.isLoading = true;
        this.signupForm.value.salary = 1000;
        this.authService.signup(this.signupForm.value).subscribe(
            resp => {
                this.isLoading = false;
                this.signupForm.reset();
                this.router.navigate(['/dash']);
                localStorage.setItem("_application_user_data", JSON.stringify(resp));
            },
            err => {
                this.isLoading = false;
                console.log(err)
            }
        );
    }

}
