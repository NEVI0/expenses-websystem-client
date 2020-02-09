/* Angular */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

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
    MatListModule,
    MatTooltipModule
} from '@angular/material';

/* Components */
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { DetailComponent } from './detail/detail.component';
import { ModalComponent } from './modal/modal.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { UpdateExpenseComponent } from './update-expense/update-expense.component';

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
        MatTooltipModule,
    ],
    entryComponents: [
        AddExpenseComponent,
        DetailComponent,
        ModalComponent,
        UpdateAccountComponent
    ],
    declarations: [
        AddExpenseComponent,
        DetailComponent,
        ModalComponent,
        UpdateAccountComponent,
        UpdateExpenseComponent,
    ]
})

export class SharedModule {}
