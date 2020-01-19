/* Angular */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

/* Components */
import { AddExpenseComponent } from './add-expense/add-expense.component';

/* Angular Material */
import {
    MatDialogModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
} from '@angular/material';


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
        MatSnackBarModule
    ],
    entryComponents: [
        AddExpenseComponent
    ],
    declarations: [
        AddExpenseComponent
    ]
})

export class SharedModule {}
