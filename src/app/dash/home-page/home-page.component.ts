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
import { ChartController } from '../../interfaces/ChatController';

export interface ChartData {
	data: Array<number>;
	label: string;
}

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

	public barChartData: Array<ChartData> = [
		{
			data: [null, null, null, null, null, null, null, null, null, null, null, null],
			label: 'Média por Mês'
		},
		{
			data: [null, null, null, null, null, null, null, null, null, null, null, null],
			label: 'Total de Despesas'
		},
	];
	public barChartLabels: Array<string>;
	public barChartOptions: Object;
	public barChartLegend: boolean;
	public barChartType: string;
	public barChartCorlors: Array<Object>;

    public expenses$: Observable<Expense[]>;
	public dataCtrl$: Observable<DataController>;
	public chartCtrl$: Observable<ChartController[]>;

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
		this.barChartCorlors = [
			{
				backgroundColor: 'rgba(98, 0, 234, 0)',
				borderColor: 'rgba(98, 0, 234, 0.7)',
				pointBackgroundColor: 'rgba(98, 0, 234, 1)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgba(98, 0, 234, 0.7)'
			},
			{
				backgroundColor: 'rgba(0, 161, 255, 0)',
				borderColor: 'rgba(0, 161, 255, 0.7)',
				pointBackgroundColor: 'rgba(0, 161, 255, 1)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgba(0, 161, 255, 0.7)'
			}
		];

		this.chartCtrl$ = this.dashService.getChartData().pipe(
			tap(resp => {
				resp.forEach(item => {
					this.barChartData[0].data[(item._id - 1)] = item.avg;
					this.barChartData[1].data[(item._id - 1)] = item.total;
				});
			})
		);
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
