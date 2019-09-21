import { NgModule, Component, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';


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
  token:string='';
}

export class Tag {
  id:number=null;
  title:string='';
}

export class Image {
  id:number=null;
  name:string='';
  size:string='';
}

@Injectable()
export class AppService {

  //serverUrl:string = 'http://192.168.1.131';
  serverUrl:string = 'http://kilo.jsmed.org';
  apiUrl:string = '/api.php';

  loginUrl:string = '?action=login';

  recipesUrl:string = '?action=list';
  recipeUrl:string = '?action=view&id=';
  saveRecipeUrl:string = '?action=save_recipe';

  imageHandlerUrl:string = '?action=upload_image';

  isMobile: boolean = false;

  constructor(private httpClient: HttpClient, private deviceService: DeviceDetectorService) { 
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit() { 
  }

  getServerUrl() {
    return this.serverUrl;
  }

  getLoginUrl() {
    return this.serverUrl + this.apiUrl + this.loginUrl;
  }

  getRecipesUrl() {
    return this.serverUrl + this.apiUrl + this.recipesUrl;
  }

  getRecipeUrl() {
    return this.serverUrl + this.apiUrl + this.recipeUrl;
  }

  getSaveRecipeUrl() {
    return this.serverUrl + this.apiUrl + this.saveRecipeUrl;
  }

  getImageHandlerUrl() {
    return this.serverUrl + this.apiUrl + this.imageHandlerUrl;
  }

  switchServer() {
    if ( this.serverUrl.indexOf("kilo") > 0 ) {
      this.serverUrl = "http://192.168.1.131";
    } else {
      this.serverUrl = "http://kilo.jsmed.org";
    }

  }

}

