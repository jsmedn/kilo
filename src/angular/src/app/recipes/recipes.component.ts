import { NgModule, Component, Injectable, OnInit, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { MatDialog, MatDialogConfig } from "@angular/material";
import { LoginDialogComponent } from "./logindialog.component";


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['../app.component.css']
})
export class RecipesComponent implements OnInit {
  recipesUrl:string = 'http://localhost:8080/kilo/rest/recipes/list';
  loginUrl:string = 'http://localhost:8080/kilo/rest/recipes/login';

  recipes:Recipe[] = [];
  loading:boolean;

  constructor(private http:Http, private _router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.listRecipes();

    this.loading = false;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(LoginDialogComponent, dialogConfig);
  }

  listRecipes() {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.recipesUrl}`;
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success
	    this.recipes = res.json();
            resolve();
          }
        );
    });
    return promise;
  }

  username: string;
  password: string;

  login(username: string, password: string) {
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');

    let options = new RequestOptions({ headers: headers });


    return this.http
      .post(this.loginUrl, JSON.stringify(
          { username: username, password: password }
        ), options)
      .toPromise()
      .then((response: Response) => {
        const userdata = response.json();
        if (userdata) {
	  localStorage.setItem('user', userdata);
        } else {
	  localStorage.removeItem('user');
        }
      },
      (error: Response): void => {
        console.log('error', error);
      }
    );
    /*
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.loginUrl}`;
      this.http.post(apiURL + "/" + username + "/" + password)
        .toPromise()
        .then(
          res => { // Success
	    if ( res != null )
	      console.log(res.json());
	    else
	      console.log("login failed");
            resolve();
          }
        );
    });
    */
  }

  goToRecipe(id: number) {
    this._router.navigate(['recipe', id]);
  }

}

export class Recipe {
  id:number=null;
  title:string='';
  ingredients:string='';
  preparation:string='';
  comment:string='';
  author:User=null;
  tags:Tag=null;
  tagsFlat:string=null;
  imageids:number[] = [];
}

export class User {
  id:number=null;
  username:string='';
  firstname:string='';
  lastname:string='';
  email:string='';
}

export class Tag {
  id:number=null;
  title:string='';
}


