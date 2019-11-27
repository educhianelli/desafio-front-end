import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { JwtHelper } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  oauthTokenUrl = 'http://localhost:8080/oauth/token'
  jwtPayload: any;

  constructor(private http: Http,
    private jwtHelper: JwtHelper,
    private router:Router) {
    this.carregarToken();
  }

  temPermissao(permissao: string){
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token); //armazena token no navegador

  }
  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

  login(usuario: string, senha: string){
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    headers.append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy');
    
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers }).subscribe(res => {
      console.log(res);
      this.router.navigate(['/clientes']);
      this.armazenarToken(res.json().access_token);

    },
      err => {
        if(err.status === 400){
          const responseJson = err.json();

          if(responseJson.error === 'invalid_grant'){
            console.log("Usuário ou senha inválido")

          }
        }else{
          
        }
      })
  }
}
