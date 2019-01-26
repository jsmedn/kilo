import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";

import { AppService } from './app.service';
import { LoginComponent } from './login/login.component';
import { RecipeComponent } from './recipe/recipe.component';
import { EditRecipeComponent } from './editrecipe/editrecipe.component';
import { RecipesComponent } from './recipes/recipes.component';

import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    RecipeComponent,
    EditRecipeComponent,
    RecipesComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    EditorModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]

})
export class AppModule { }
