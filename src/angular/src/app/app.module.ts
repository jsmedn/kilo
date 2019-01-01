import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipesComponent } from './recipes/recipes.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    RecipesComponent
  ],
  imports: [
    BrowserModule, HttpModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
