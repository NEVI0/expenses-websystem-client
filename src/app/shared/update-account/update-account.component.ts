import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { DashService } from '../../dash/dash.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})

export class UpdateAccountComponent implements OnInit {

    private readonly AppUserData = environment.AppUserData;
    updateForm: FormGroup;

    isLoading: boolean = false;

    constructor(
        private dialogRef: MatDialogRef<any>,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private dashService: DashService,
        private snackbar: MatSnackBar,
        private router: Router
    ) {}

    ngOnInit() {
        this.updateForm = this.formBuilder.group({
            name: [ this.authService.user.name, Validators.required ],
            email: [ this.authService.user.email, [Validators.required, Validators.email] ],
            salary: [ this.authService.user.salary ]
        });
    }

    onUpdate() {
        const stringfy = JSON.stringify(this.updateForm.value);
        this.isLoading = true;
        this.dashService.updateUser(this.authService.user._id, JSON.parse(stringfy)).subscribe(
            resp => {
                localStorage.removeItem(this.AppUserData);
                localStorage.setItem(this.AppUserData, JSON.stringify(resp));

                this.isLoading = false;
                this.dialogRef.close(true);
                this.authService._user = resp;

                this.snackbar.open("Seus dados foram atualizados com sucesso!", "Ok", {
                    duration: 3500
                });
                this.router.navigate(['/dash/account']);
            },
            err => {
                this.dialogRef.close(false);
                this.isLoading = false;

                if (err.error.message == null || err.error.message == undefined) {
                    this.snackbar.open("Ocorreu um Error! Tente novamente", "Ok", {
                        duration: 3500
                    });
                } else {
                    this.snackbar.open(err.error.message, "Ok", {
                        duration: 3500
                    });
                }

                console.log(err);
            }
        );
    }

}
