import { NgModule, Component, Injectable, OnInit, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['../app.component.css']
})
export class RecipesComponent implements OnInit {
  recipesUrl:string = 'http://localhost:8080/kilo/rest/recipes/list';

  recipes:Recipe[] = [];
  loading:boolean;

  user:User = null;

  constructor(private http:Http, private _router: Router) {
  }

  ngOnInit() {
    if ( localStorage.getItem("user") != null ) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }

    this.listRecipes();

    this.loading = false;
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


  goToRecipe(id: number) {
    this._router.navigate(['recipe', id]);
  }

  editRecipe(id: number) {
    this._router.navigate(['editrecipe', id]);
  }

  goToLogin() {
    this._router.navigate(['login']);
  }

  logout() {
    localStorage.removeItem("user");
    document.location.reload();
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


