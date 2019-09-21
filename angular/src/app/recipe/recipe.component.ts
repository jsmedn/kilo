import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AppService, Recipe } from '../app.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['../app.component.css']
})
export class RecipeComponent implements OnInit {
  id: number = -1;
  recipe: Recipe = null;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private _router: Router, public appservice: AppService) {
  }

  ngOnInit() {

    this.route.queryParams.forEach((params: Params) => {
      if ( params['local'] === 'true' ) {
        this.appservice.serverUrl = 'http://192.168.1.131';
      }
    });


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
      this.httpClient.get<Recipe>(this.appservice.getRecipeUrl() + id)
        .toPromise()
        .then(
          res => { // Success
	    this.recipe = res;
            resolve();
          }
        );
    });
    return promise;
  }

      showThumbnail(id: number) {
          let img = <HTMLImageElement>document.getElementById("thumbnail");
	  img.src= this.appservice.getServerUrl() + "/thumbnail.php?id=" + id;
      }

}
