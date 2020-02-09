import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DashService } from '../../dash/dash.service';

@Component({
    selector: 'app-update-expense',
    templateUrl: './update-expense.component.html',
    styleUrls: ['./update-expense.component.scss']
})

export class UpdateExpenseComponent implements OnInit {

    updateForm: FormGroup;
    total: number = 0;
    isLoading: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<any>,
        private dashService: DashService,
        private snackbar: MatSnackBar,
    ) {}

    ngOnInit() {
        this.updateForm = this.formBuilder.group({
            name: [ this.data.expense.name, Validators.required ],
            value: [ this.data.expense.value, Validators.required ],
            date: [ this.data.expense.date,[
                Validators.required,
                Validators.maxLength(10),
                Validators.pattern("^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}$")
            ] ],
            description: [ this.data.expense.description, Validators.maxLength(200) ]
        });

        this.updateForm.valueChanges.subscribe(form => {
            if (form.description !== null) this.total = form.description.length
        });
    }

    onUpdateExpense() {
        this.isLoading = true;

        if (this.updateForm.value.description == "" || this.updateForm.value.description == null) {
            this.updateForm.value.description = "Sem Descrição";
        }

        this.updateForm.value.tags = [
            this.updateForm.value.name.toUpperCase(),
            this.updateForm.value.value.toString(),
            this.updateForm.value.date.toString()
        ];

        const stringfy = JSON.stringify(this.updateForm.value);
        
        this.dashService.updateExpense(this.data.expense._id, JSON.parse(stringfy)).subscribe(
            resp => {
                this.isLoading = false;
                this.snackbar.open("Despesa atualizada com Sucesso!", "Ok", {
                    duration: 3500
                });
                this.dialogRef.close(true);
            },
            err => {
                this.isLoading = false;
                this.dialogRef.close(false);
                this.snackbar.open(err.error.message, "Ok", {
                    duration: 3500
                });
                console.log(err);
            }
        );
    }

}
