import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../recipes/recipes.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-recipe',
  templateUrl: './editrecipe.component.html',
  styleUrls: ['../app.component.css']
})
export class EditRecipeComponent implements OnInit {
  recipeUrl:string = 'http://localhost:8080/kilo/rest/recipes/recipe/';
  saveRecipeUrl:string = 'http://localhost:8080/kilo/rest/recipes/recipe/save';

  id: number = -1;
  recipe: Recipe = null;

  title: string = null;
  ingredients: string = null;
  preparation: string = null;
  comment: string = null;

  constructor(private http:Http, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
      this.getRecipe(this.id);
    });

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

            this.title = this.recipe.title;
            this.ingredients = this.recipe.ingredients;
            this.preparation = this.recipe.preparation;
            this.comment = this.recipe.comment;

            resolve();
          }
        );
    });
    return promise;
  }

  showThumbnail(id: number) {
    let img = <HTMLImageElement>document.getElementById("thumbnail");
    img.src="http://localhost:8080/kilo/image?id=" + id;
  }

  saveRecipe() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');

    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.saveRecipeUrl,
            "id=" + this.id + 
            "&title=" + this.title + 
	    "&ingredients=" + this.ingredients + 
	    "&preparation=" + this.preparation + 
	    "&comment=" + this.comment
            , options) 
      .toPromise()
      .then((response: Response) => {
        this._router.navigate(['recipes']);
      },
      (error: Response): void => {
        console.log('error', error);
      }
    );
  }


}
