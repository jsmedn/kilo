import { NgModule, Component, Injectable, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //authUrl:string = 'http://localhost:8080/kilo/rest/recipes/auth';

  constructor() { 
  }

  ngOnInit() {
  }



  /*
  public getAuth(): Promise<any> {
    return this.http.get(this.authUrl)
        .toPromise();
  }
  */



}

