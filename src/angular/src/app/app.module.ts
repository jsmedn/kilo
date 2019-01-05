import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from "@angular/material";

import { RecipeComponent } from './recipe/recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { LoginDialogComponent } from './recipes/logindialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    RecipesComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule, HttpModule, AppRoutingModule, MatDialogModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent]

})
export class AppModule { }
