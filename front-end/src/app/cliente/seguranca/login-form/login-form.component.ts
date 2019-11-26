import { AuthService } from './../auth.service';
import { Http, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

   usuario:string;
   senha:string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login(usuario: string, senha:string){
    this.auth.login(this.usuario,this.senha);
  }

}
