/* Angular */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

/* Angular Material */
import {
    MatDialogModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatListModule
} from '@angular/material';

/* Components */
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { DetailComponent } from './detail/detail.component';
import { ModalComponent } from './modal/modal.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { UpdateImageComponent } from './update-image/update-image.component';

import { environment } from '../../environments/environment';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatListModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.Firebase)
    ],
    entryComponents: [
        AddExpenseComponent,
        DetailComponent,
        ModalComponent,
        UpdateImageComponent,
        UpdateAccountComponent
    ],
    declarations: [
        AddExpenseComponent,
        DetailComponent,
        ModalComponent,
        UpdateAccountComponent,
        UpdateImageComponent,
    ]
})

export class SharedModule {}
