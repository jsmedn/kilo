import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { AppService, User } from '../app.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent implements OnInit {
  //loginUrl:string = 'http://localhost:8080/kilo/rest/recipes/login';

  username: string;
  password: string;

  constructor(private httpClient:HttpClient, private route: ActivatedRoute, private _router: Router, private appservice: AppService) { }

  ngOnInit() {
  }

  goBack() {
    this._router.navigate(['recipes']);
  }


  login() {
    let headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')

    let params: HttpParams = new HttpParams()
       .append('username', this.username)
       .append('password', this.password);

    return this.httpClient
      .post(this.appservice.getLoginUrl(),
            params.toString(),
	    { observe: 'body', headers: headers }) 
      .toPromise()
      .then((response: HttpResponse<User>) => {
        const userdata = response;

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
