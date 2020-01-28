import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject, empty } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Expense } from '../../interfaces/Expense';
import { DashService } from '../dash.service';
import { DetailComponent } from 'src/app/shared/detail/detail.component';

@Component({
    selector: 'app-all-expenses',
    templateUrl: './all-expenses.component.html',
    styleUrls: ['./all-expenses.component.scss']
})

export class AllExpensesComponent implements OnInit {

	expenses$: Observable<Expense[]>;
	searchData$: Observable<Expense[]>;
	error$ = new Subject<boolean>();

	searchForm: FormGroup;

	displayedColumns: string[];
	isLoading: boolean = false;
	index: number = 1;

	constructor(
		private dashService: DashService,
		private dialog: MatDialog,
		private formBuilder: FormBuilder,
		private snackbar: MatSnackBar
	) {}

	ngOnInit() {
		this.onRefresh();
		this.displayedColumns = ['#', 'name', 'value', 'date', 'description'];
		this.searchForm = this.formBuilder.group({
			tag: [ null ]
		});
	}

	onRefresh() {
		this.expenses$ = this.dashService.getExpenses().pipe(
			catchError(err => {
				this.error$.next(err);
				return empty();
			})
		);
	}

	onSearch() {
		const stringfy = JSON.stringify(this.searchForm.value);
		this.searchData$ = this.dashService.search(JSON.parse(stringfy)).pipe(
			catchError(err => {
				this.snackbar.open(err.error.errorMsg, "Ok", {
					duration: 3500
				});
				return empty();
			})
		)
	}

	onShowDetail(_id: string) {
		this.dialog.open(DetailComponent, {
			width: "400px",
			data: { _id: _id }
		});
	}

	onShowAlert(_id: string) {
		console.log("Mosta uma mensagem de alerta!");
	}

	onShowInfo(_id) {
		console.log(_id);
	}

}
