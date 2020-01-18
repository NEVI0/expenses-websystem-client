import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs/operators'

import { environment } from '../../environments/environment';
import { User } from '../interfaces/User';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private readonly BlockedApiUrl = environment.BlockedApiUrl;
    private readonly OpenedApiUrl = environment.OpenApiUrl;
    private _user;

    constructor(
        private http: HttpClient
    ) {}

    get user() {
        return this._user;
    }

    isAuthenticate() {
        return localStorage.getItem("_application_user_data");
    }

    login(json) {
        return this.http.post<User>(`${this.OpenedApiUrl}/login`, json).pipe(
            tap(resp => this._user = resp)
        );
    }

    signup(json) {
        return this.http.post<User>(`${this.OpenedApiUrl}/signup`, json).pipe(
            tap(resp => this._user = resp)
        );
    }


}
