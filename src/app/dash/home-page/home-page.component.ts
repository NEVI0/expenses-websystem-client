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

	public barChatData: Array<Object> = [
		{ data: [12, 54, 11, 54, 76, 34, 43, 29, 12, 23, 69, 8], label: 'Média por Mês' },
	];
	public barChartLabels: Array<string>;
	public barChartOptions: Object;
	public barChartLegend: boolean;
	public barChartType: string;
	public barChartCorlors: Array<Object>;

    public expenses$: Observable<Expense[]>;
	public dataCtrl$: Observable<DataController>;

	public userSalary = this.authService.user.salary;
	public numberOfExpenses: number;
	public isDanger: boolean = false;
	public calc: number;

  	constructor(
		private dashService: DashService,
		private dialog: MatDialog,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.onRefresh();
	}

	onRefresh() {
		this.barChartLegend = true;
		this.barChartType = 'line';
		this.barChartLabels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
		this.barChartOptions  = {
			scaleShowVerticalLines: false,
			responsive: true,
			bezierCurve: false,
			elements: {
				line: {	tension: 0 }
			}
		};
		this.barChartCorlors = [{
			backgroundColor: 'rgba(98, 0, 234, 0)',
			borderColor: 'rgba(98, 0, 234, 0.7)',
			pointBackgroundColor: 'rgba(98, 0, 234, 0.2)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(98, 0, 234, 0.7)'
		}];


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
