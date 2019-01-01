import { NgModule, Component, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Kilo';

  entryUrl:string = 'http://localhost:8080/kilo/rest/recipes/list';

  recipes:Recipe[] = [];
  loading:boolean;


  constructor(private http:Http) { 
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
	    console.log(this.recipes);
            resolve();
          }
        );
    });
    return promise;
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
