import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';

import { DashService } from '../../dash/dash.service';
import { Expense } from '../../interfaces/Expense';
import { AddExpenseComponent } from '../add-expense/add-expense.component';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit {

    expense$: Observable<Expense>;

    constructor(
        private dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dashService: DashService,
        private snackbar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.onRefresh();
    }

    onRefresh() {
        this.expense$ = this.dashService.getExpenseById(this.data._id);
    }

    onDelete(_id: string) {
        this.dashService.deleteExpense(_id).subscribe(
            resp => {
                this.snackbar.open("Despesa deletada com sucesso!", "Ok", {
                    duration: 3500
                });
                this.dialogRef.close(true);
            },
            err => {
                console.log(err);
                this.snackbar.open("Ocorreu um Error! Tente Novamente", "Ok", {
                    duration: 3500
                });
                this.dialogRef.close(true);
            }
        );
    }

    onChangeStatus(_id: string, status: string) {
        var stringfy = null;

        if (status == "PENDENTE") {
            stringfy = '{ "status": "PAGO" }';
        } else {
            stringfy = '{ "status": "PENDENTE" }';
        }

        this.dashService.updateExpense(_id, JSON.parse(stringfy)).subscribe(
            resp => {
                this.snackbar.open(`O status foi mudado para: ${resp.status}`, "Ok", {
                    duration: 3500
                });
                this.onRefresh();
            },
            err => {
                console.log(err);
                this.snackbar.open("Ocorreu um Error! Tente Novamente", "Ok", {
                    duration: 3500
                });
            }
        )
    }

    onUpdate(_id: string) {
        this.dialog.closeAll();
        this.dialog.open(AddExpenseComponent, {
            data: { _id }
        });
    }

}
