import { NgModule, Component, Injectable, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector: 'login-dialog',
    templateUrl: './logindialog.component.html',
    styleUrls: ['./recipes.component.css'],
    providers: [FormBuilder]
})
export class LoginDialogComponent implements OnInit {

    form: FormGroup;
    description:string;

//example: https://blog.angular-university.io/angular-material-dialog/

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<LoginDialogComponent>
	) {


        this.form = fb.group({
            description: [description, Validators.required],
            category: [category, Validators.required],
            longDescription: [longDescription,Validators.required]
        });
    }

    ngOnInit() {

    }
    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }
}