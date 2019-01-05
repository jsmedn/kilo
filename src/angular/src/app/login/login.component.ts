import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../recipes/recipes.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent implements OnInit {
  loginUrl:string = 'http://localhost:8080/kilo/rest/recipes/login';

  username: string;
  password: string;

  constructor(private http:Http, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this._router.navigate(['recipes']);
  }


  login() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');

    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.loginUrl,
            "username=" + this.username + "&password=" + this.password
            , options) 
      .toPromise()
      .then((response: Response) => {
        const userdata = response.json();
        if (userdata) {
	  localStorage.setItem('user', JSON.stringify(userdata));
        } else {
	  localStorage.removeItem('user');
        }
        this._router.navigate(['recipes']);
      },
      (error: Response): void => {
        console.log('error', error);
      }
    );
  }

}
