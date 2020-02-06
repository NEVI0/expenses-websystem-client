import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Expense } from '../../interfaces/Expense';
import { DataController } from '../../interfaces/DataController';
import { DashService } from '../dash.service';
import { DetailComponent } from '../../shared/detail/detail.component';
import { AuthService } from '../../auth/auth.service';
import { AddExpenseComponent } from '../../shared/add-expense/add-expense.component';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

	public barChatData = [
		{ data: [12, 54, 11, 54, 76, 34, 43, 29, 12, 23, 69, 0], label: 'Média por Mês' },
	];
	public barChartLabels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
	public barChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	public barChartLegend = true;
	public barChartType = 'line';
	public barChartCorlors = [{
		backgroundColor: 'rgba(98, 0, 234, 0.2)',
		borderColor: 'rgba(98, 0, 234, 0.7)',
		pointBackgroundColor: 'rgba(98, 0, 234, 0.2)',
		pointBorderColor: '#fff',
		pointHoverBackgroundColor: '#fff',
		pointHoverBorderColor: 'rgba(98, 0, 234, 0.7)'
	}];

    expenses$: Observable<Expense[]>;
	dataCtrl$: Observable<DataController>;

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
			tap(resp => this.numberOfExpenses = resp.length)
		);
		this.dataCtrl$ = this.dashService.getUserController().pipe(
			tap(resp => {
				this.calc = this.authService.user.salary - resp.sumOfValues;
				if (this.calc >= 0) {
					this.isDanger = false;
				} else {
					this.isDanger = true;
				}
			})
		);
	}

	onShowDetail(_id: string) {
		const dialogRef = this.dialog.open(DetailComponent, {
			width: "400px",
			data: { _id }
		});
		dialogRef.afterClosed().subscribe(resp => {
			if (resp == true) this.onRefresh();
		});
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
