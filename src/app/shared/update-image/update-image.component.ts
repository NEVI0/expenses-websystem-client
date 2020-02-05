import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { DashService } from '../../dash/dash.service';

@Component({
    selector: 'app-update-image',
    templateUrl: './update-image.component.html',
    styleUrls: ['./update-image.component.scss']
})

export class UpdateImageComponent implements OnInit {

    private readonly AppUserData = environment.AppUserData;
    file: File = null;
    isLoading: boolean = false;

    constructor(
        private snackbar: MatSnackBar,
        private dialog: MatDialog,
        private storage: AngularFireStorage,
        private authService: AuthService,
        private dashService: DashService
    ) {}

    ngOnInit() {}

    onChange(event) {
        this.file = <File>event.target.files[0];
    }

    onUpload() {
        this.isLoading = true;

        if (!this.file) {
            this.isLoading = false;
            this.snackbar.open("Nenhuma imagem foi selecionada!", "Ok", {
                duration: 3500
            });
            return;
        }

        this.storage.upload(`${Date.now()}-${this.file.name}`, this.file).then(storageResp => {

            this.isLoading = false;
            this.dialog.closeAll();
            this.dashService.updateUser(this.authService.user._id, {
                imgName: storageResp.metadata.name
            }).subscribe(resp => {
                localStorage.removeItem(this.AppUserData);
                localStorage.setItem(this.AppUserData, JSON.stringify(resp));
                this.snackbar.open("Sua imagem foi alterada com sucesso!", "Ok", {
                    duration: 3500
                });
            });

        }).catch(err => {
            console.log(err);
            this.isLoading = false;
            this.snackbar.open("Ocorreu um Error! Tente Novamente", "Ok", {
                duration: 3500
            })
        })
    }

}
