import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, Subject, empty } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Expense } from '../../interfaces/Expense';
import { DataController } from '../../interfaces/DataController';
import { DashService } from '../dash.service';
import { DetailComponent } from '../../shared/detail/detail.component';
import { AuthService } from '../../auth/auth.service';
import { AddExpenseComponent } from 'src/app/shared/add-expense/add-expense.component';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

    expenses$: Observable<Expense[]>;
	dataCtrl$: Observable<DataController>;
	error$ = new Subject<boolean>();

	userSalary: number = this.authService.user.salary;
	numberOfExpenses: number;
	panelOpenState: boolean = false;
	isDanger: boolean = false;
	calc: number;

  	constructor(
		private dashService: DashService,
		private dialog: MatDialog,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.onRefresh();
	}

	onRefresh() {
		this.expenses$ = this.dashService.getLastTenExpenses().pipe(
			tap(resp => {
				this.numberOfExpenses = resp.length;
			}),
			catchError(err => {
				this.error$.next(err);
				return empty();
			})
		);
		this.dataCtrl$ = this.dashService.getUserController().pipe(
			tap(resp => {
				this.calc = this.authService.user.salary - resp.sumOfValues;
				if (this.calc >= 0) {
					this.isDanger = false;
				} else {
					this.isDanger = true;
				}
			}),
			catchError(err => {
				this.error$.next(err);
				return empty();
			})
		);
	}

	onShowDetail(_id: string) {
		const dialogRef = this.dialog.open(DetailComponent, {
			width: "400px",
			data: { _id }
		});
		dialogRef.afterClosed().subscribe();
	}

	openDialog() {
		const dialogRef = this.dialog.open(AddExpenseComponent, {
            width: "400px"
        });
        dialogRef.afterClosed().subscribe(resp => {
			console.log(`Dialog Result: ${resp}`);
		});
	}

}
