import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { DashService } from '../../dash/dash.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {

    private readonly AppUserData = environment.AppUserData;
    private readonly AppTheme = environment.AppTheme;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dashService: DashService,
        private router: Router,
        private dialog: MatDialog,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit() {}

    onAction() {
        this.dashService.deleteUser(this.data._id).subscribe(
            resp => {
                console.log(resp);
                localStorage.removeItem(this.AppUserData);
                localStorage.removeItem(this.AppTheme);
                this.dialog.closeAll();
                this.router.navigate(['/auth']);
            },
            err => {
                console.log(err);
                this.dialog.closeAll();

                if (err.error.errorMsg == undefined || err.error.errorMsg == null || err.error.errorMsg == '') {
                    this.snackbar.open("Ocorreu um Error! Tente Novamente", "Ok", {
                        duration: 3500
                    });
                } else {
                    this.snackbar.open(err.error.errorMsg, "Ok", {
                        duration: 3500
                    });
                }

            }
        );
    }

}
