import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, Subject, empty } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Expense } from '../../interfaces/Expense';
import { DashService } from '../dash.service';

@Component({
    selector: 'app-all-expenses',
    templateUrl: './all-expenses.component.html',
    styleUrls: ['./all-expenses.component.scss']
})

export class AllExpensesComponent implements OnInit {

    expenses$: Observable<Expense[]>;
	error$ = new Subject<boolean>();
	displayedColumns: string[];

	constructor(
		private dashService: DashService,
		private dialog: MatDialog
	) {}

	ngOnInit() {
		this.onRefresh();
		this.displayedColumns = ['name', 'value', 'createdAt', 'actions'];
	}

	onRefresh() {
		this.expenses$ = this.dashService.getExpenses().pipe(
			catchError(err => {
				this.error$.next(err);
				return empty();
			})
		);
	}

	onShowAlert(_id: string) {
		console.log("Mosta uma mensagem de alerta!");
	}

}
