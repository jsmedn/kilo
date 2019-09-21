import { NgModule, Component, Injectable, OnInit, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppService, Recipe, User, Tag } from '../app.service';

@Component({
  selector: 'app-recipes', 
  templateUrl: './recipes.component.html',
  styleUrls: ['../app.component.css']
})
export class RecipesComponent implements OnInit {
  recipes:Recipe[] = [];
  allRecipes:Recipe[] = [];
  loading:boolean;
  user:User = null;
  query:string = "";

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private _router: Router, public appservice: AppService) {
  }

  ngOnInit() {
    console.log("we be here");
    this.route.params.forEach((params: Params) => {
      if ( params['local'] === 'local' ) {
        this.appservice.serverUrl = 'http://192.168.1.131';
      }
    });


    if ( localStorage.getItem("user") != null ) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }

    this.listRecipes();

    this.loading = false;
  }

  listRecipes() {
    let promise = new Promise((resolve, reject) => {
      this.httpClient.get<Recipe[]>(this.appservice.getRecipesUrl())
        .toPromise()
        .then(res => {
          this.recipes = res;
          this.allRecipes = res;
	  resolve();
        });

    });
    return promise;
  }

  searchRecipes() {
    this.recipes = this.allRecipes.filter(recipe => this.query == null || this.query == "" || recipe.title.toLowerCase().indexOf(this.query.toLowerCase()) !== -1)
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

  switchServer() {
    this.appservice.switchServer();
    this.listRecipes();
  }

}



