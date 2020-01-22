import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { DashService } from '../../dash/dash.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-add-expense',
    templateUrl: './add-expense.component.html',
    styleUrls: ['./add-expense.component.scss']
})

export class AddExpenseComponent implements OnInit {

    addForm: FormGroup

    constructor(
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private dashService: DashService,
        private authService: AuthService,
        private snackbar: MatSnackBar,
        private router: Router
    ) {}

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            name: [ null, Validators.required ],
            value: [ null, Validators.required ],
            date: [ Date.now, Validators.required ],
            description: [ null, Validators.maxLength(200) ]
        });
    }

    onAddExpense() {
        this.addForm.value.userId = this.authService.user._id;

        if (this.addForm.value.description == '' || this.addForm.value.description == null) {
            this.addForm.value.description = "Sem Descrição";
        }

        this.addForm.value.tags = [
            this.addForm.value.name.toUpperCase(),
            this.addForm.value.description.toUpperCase()
        ];

        const stringfy = JSON.stringify(this.addForm.value);

        this.dashService.insertExpense(JSON.parse(stringfy)).subscribe(
            resp => {
                this.dialog.closeAll();
                this.snackbar.open("Despesa adicionada com sucesso!", "Ok", {
                    duration: 3500
                });
                this.router.navigate(['/dash/all-expenses']);
            },
            err => {
                this.snackbar.open(err.error.errorMsg, "Ok", {
                    duration: 3500
                });
                this.dialog.closeAll();
            }
        );
    }

    onCloseDialog() {
        this.dialog.closeAll();
    }

}
