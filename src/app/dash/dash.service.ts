import { Injectable } from '@angular/core';
import { tap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Expense } from '../interfaces/Expense';
import { DataController } from '../interfaces/DataController';

@Injectable({
    providedIn: 'root'
})

export class DashService {

    private readonly BlockedApiUrl = environment.BlockedApiUrl;
	private readonly UserId = 'u1';

    constructor(private http: HttpClient) {}

	getExpenses() {
		return this.http.get<Expense[]>(`${this.BlockedApiUrl}/expenses/${this.UserId}`).pipe(tap(resp => resp));
	}

	getLastTenExpenses() {
		return this.http.get<Expense[]>(`${this.BlockedApiUrl}/lastExpenses/${this.UserId}`).pipe(tap(resp => resp));
	}

	getUserController() {
		return this.http.get<DataController>(`${this.BlockedApiUrl}/dataController/${this.UserId}`).pipe(tap(resp => resp));
	}

	insertExpense(body) {
		return this.http.post(`${this.BlockedApiUrl}/expenses/`, body).pipe(take(1));
	}

	updateExpense(data, _id: string) {

	}

	deleteExpense(_id: string) {
		return this.http.delete(`${this.BlockedApiUrl}/expenses/${_id}`).pipe(take(1));
	}

}
