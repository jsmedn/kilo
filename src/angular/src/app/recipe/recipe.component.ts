import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Recipe } from '../recipes/recipes.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['../app.component.css']
})
export class RecipeComponent implements OnInit {
  recipeUrl:string = 'http://localhost:8080/kilo/rest/recipes/recipe/';

  id: number = -1;
  recipe: Recipe = null;

  constructor(private http:Http, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
      this.getRecipe(this.id);
    }

  }

  goBack() {
    this._router.navigate(['recipes']);
  }

  getRecipe(id: number) {
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.recipeUrl + id)
        .toPromise()
        .then(
          res => { // Success
	    this.recipe = res.json();
            resolve();
          }
        );
    });
    return promise;
  }

}
