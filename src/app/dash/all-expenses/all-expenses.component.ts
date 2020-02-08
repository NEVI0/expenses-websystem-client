import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

import { Expense } from '../../interfaces/Expense';
import { DashService } from '../dash.service';
import { DetailComponent } from '../../shared/detail/detail.component';
import { AuthService } from '../../auth/auth.service';
import { AddExpenseComponent } from '../../shared/add-expense/add-expense.component';

@Component({
    selector: 'app-all-expenses',
    templateUrl: './all-expenses.component.html',
    styleUrls: ['./all-expenses.component.scss']
})

export class AllExpensesComponent implements OnInit {

	expenses$: Observable<Expense[]>;
	results$: Observable<Expense[]>;

	tag = new FormControl();

	displayedColumns: string[];
	isLoading: boolean = false;
	totalResults: number;

	constructor(
		private dashService: DashService,
		private authService: AuthService,
		private dialog: MatDialog,
	) {}

	ngOnInit() {
		this.onRefresh();
	}

	onRefresh() {
		this.expenses$ = this.dashService.getExpenses();
		this.results$ = this.tag.valueChanges.pipe(
			map(result => result.trim()),
			debounceTime(250),
			distinctUntilChanged(),
			switchMap(result => this.dashService.search(this.authService.user._id, result)),
			tap(result => this.totalResults = result.length)
		);
		this.displayedColumns = ['name', 'value', 'status', 'date'];
	}

	onShowDetail(_id: string) {
		const dialogRef = this.dialog.open(DetailComponent, {
			width: "400px",
			data: { _id: _id }
		});
		dialogRef.afterClosed().subscribe(resp => {
			if (resp == true) this.onRefresh();
		})
	}

	onAddExpense() {
		const dialogRef = this.dialog.open(AddExpenseComponent, {
            width: "400px"
        });
        dialogRef.afterClosed().subscribe(resp => {
			if (resp == true) this.onRefresh();
		});
	}

}
