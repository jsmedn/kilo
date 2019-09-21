import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { AppService, Recipe, User, Tag, Image } from '../app.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-recipe',
  templateUrl: './editrecipe.component.html',
  styleUrls: ['../app.component.css']
})
export class EditRecipeComponent implements OnInit {

  id: number = -1;
  recipe: Recipe = null;

  title: string = null;
  ingredients: string = null;
  preparation: string = null;
  comment: string = null;

  file: any;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private httpClient:HttpClient, private route: ActivatedRoute, private _router: Router, private appservice: AppService) { }

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
    img.src = this.appservice.getServerUrl() + "/thumbnail.php?id=" + id;
  }

  saveRecipe() {
    let userid: number = 0;
    let token: string = null;
    if ( localStorage.getItem("user") != null ) {
      let user:User = JSON.parse(localStorage.getItem("user"));
      userid = user.id;
      token = user.token;
    }


    let headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')

    let params: HttpParams = new HttpParams()
       .append('id', this.id.toString())
       .append('title', this.title)
       .append('ingredients', this.ingredients)
       .append('preparation', this.preparation)
       .append('comment', this.comment)
       .append('userid', userid.toString())
       .append('token', token);


    return this.httpClient
      .post(this.appservice.getSaveRecipeUrl(),
            params.toString(),
            {headers: headers}) 
      .toPromise()
      .then((response: HttpResponse<void>) => {
        this._router.navigate(['recipes']);
      },
      (error: HttpResponse<void>): void => {
        console.log('error', error);
      }
    );
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  uploadImage() {
    let userid: number = 0;
    let token: string = null;
    if ( localStorage.getItem("user") != null ) {
      let user:User = JSON.parse(localStorage.getItem("user"));
      userid = user.id;
      token = user.token;
    }

    const formData = new FormData();
    formData.append('image', this.file);
    formData.append('id', this.id.toString());
    formData.append('userid', userid.toString());
    formData.append('token', token);

    return this.httpClient.post<number[]>(
        this.appservice.getImageHandlerUrl(),
        formData
      )
      .toPromise()
        .then(
          res => { // Success
	    
        this.recipe.imageids = res;
	this.file = null;
        this.fileInput.nativeElement.value = '';
      },
      (error: HttpResponse<void>): void => {
        console.log('error', error);
      }
    );

  }
}
