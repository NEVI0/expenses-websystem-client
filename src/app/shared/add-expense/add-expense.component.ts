import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { DashService } from '../../dash/dash.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-add-expense',
    templateUrl: './add-expense.component.html',
    styleUrls: ['./add-expense.component.scss']
})

export class AddExpenseComponent implements OnInit {

    addForm: FormGroup;
    total: number = 0;

    constructor(
        private dialogRef: MatDialogRef<any>,
        private formBuilder: FormBuilder,
        private dashService: DashService,
        private authService: AuthService,
        private snackbar: MatSnackBar,
        private router: Router
    ) {}

    ngOnInit() {
        const date = {
            d: new Date().getDate(),
            m: new Date().getMonth(),
            y: new Date().getFullYear()
        }

        var d = null;
        var m = null;

        if (date.d >= 1 && date.d <= 9) d = "0" + date.d; else d = date.d;
        if (date.m >= 1 && date.m <= 9) m = "0" + (date.m + 1); else m = date.m;

        this.addForm = this.formBuilder.group({
            name: [ null, Validators.required ],
            value: [ null, Validators.required ],
            date: [ `${d}/${m}/${date.y}`, [
                Validators.required,
                Validators.maxLength(10),
                Validators.pattern("^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}$")
            ] ],
            description: [ null, Validators.maxLength(200) ]
        });

        this.addForm.valueChanges.subscribe(form => {
            if (form.description !== null) this.total = form.description.length
        });
    }

    onAddExpense() {
        this.addForm.value.userId = this.authService.user._id;

        if (this.addForm.value.description == "" || this.addForm.value.description == null) {
            this.addForm.value.description = "Sem Descrição";
        }

        this.addForm.value.tags = [
            this.addForm.value.name.toUpperCase(),
            this.addForm.value.value.toString(),
            this.addForm.value.date.toString()
        ];

        const stringfy = JSON.stringify(this.addForm.value);

        this.dashService.insertExpense(JSON.parse(stringfy)).subscribe(
            resp => {
                this.dialogRef.close(true);
                this.snackbar.open("Despesa adicionada com sucesso!", "Ok", {
                    duration: 3500
                });
                this.router.navigate(["/dash/all-expenses"]);
            },
            err => {
                this.snackbar.open(err.error.errorMsg, "Ok", {
                    duration: 3500
                });
                this.dialogRef.close(false);
            }
        );
    }

}
