import { NgModule, Component, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response } from '@angular/http';

@Injectable()
export class AppService {

  authUrl:string = 'http://localhost:8080/kilo/rest/recipes/auth';

  constructor(private http:Http) { 
  }

  public getAuth(): Promise<any> {
    return this.http.get(this.authUrl)
        .toPromise();
  }

}

