import { NgModule, Component, Injectable, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['../app.component.css']
})
export class RecipesComponent implements OnInit {
  entryUrl:string = 'http://localhost:8080/kilo/rest/recipes/list';

  recipes:Recipe[] = [];
  loading:boolean;

  constructor(private http:Http, private _router: Router) {
  }

  ngOnInit() {
    this.listRecipes();

    this.loading = false;
  }


  listRecipes() {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.entryUrl}`;
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

}

export class Recipe {
  id:number=null;
  title:string='';
  ingredients:string='';
  preparation:string='';
  comment:string='';
  author:Author=null;
  tags:Tag=null;
  tagsFlat:string=null;
  imageids:number[] = [];
}

export class Author {
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

