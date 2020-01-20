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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatListModule
} from '@angular/material';
import { DetailComponent } from './detail/detail.component';


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
        MatListModule
    ],
    entryComponents: [
        AddExpenseComponent,
        DetailComponent
    ],
    declarations: [
        AddExpenseComponent,
        DetailComponent
    ],
    exports: [
        DetailComponent
    ]
})

export class SharedModule {}
