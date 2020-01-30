import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, catchError, map, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

import { Expense } from '../../interfaces/Expense';
import { DashService } from '../dash.service';
import { DetailComponent } from '../../shared/detail/detail.component';
import { AuthService } from '../../auth/auth.service';

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
	index: number = 1;

	constructor(
		private dashService: DashService,
		private authService: AuthService,
		private dialog: MatDialog,
		private snackbar: MatSnackBar
	) {}

	ngOnInit() {
		this.onRefresh();
		this.displayedColumns = ['#', 'name', 'value', 'date', 'description'];

		this.results$ = this.tag.valueChanges.pipe(
			map(result => result.trim()),
			debounceTime(250),
			distinctUntilChanged(),
			switchMap(result => this.dashService.search(this.authService.user._id, result)),
			tap((result: any) => {
				this.totalResults = result.length;
				console.log(result);
			})
		);
	}

	onRefresh() {
		this.expenses$ = this.dashService.getExpenses();
	}

	onShowDetail(_id: string) {
		this.dialog.open(DetailComponent, {
			width: "400px",
			data: { _id: _id }
		});
	}

}
