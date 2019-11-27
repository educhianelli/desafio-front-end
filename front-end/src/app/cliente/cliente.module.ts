import { RequestOptions, Http } from '@angular/http';
import { AuthHttp, JwtHelper, AuthConfig } from 'angular2-jwt';
import { AuthService } from '../seguranca/auth.service';
import { RouterModule } from '@angular/router';
import { ClienteService } from './cliente.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';



import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {ButtonModule} from 'primeng/components/button/button';
import {TableModule} from 'primeng/components/table/table';
import {TooltipModule} from 'primeng/tooltip';
import {DropdownModule} from 'primeng/dropdown';



import { NgxMaskModule, IConfig } from 'ngx-mask'

 
import { ClientePesquisaComponent } from './cliente-pesquisa/cliente-pesquisa.component';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { NavbarComponent } from '../navbar/navbar.component';
import {InputMaskModule} from 'primeng/inputmask';
import { LoginFormComponent } from '../seguranca/login-form/login-form.component';


export function authHttpServiceFactory(http: Http, options: RequestOptions  ){
  return new AuthHttp(new AuthConfig(),http,options);
}
@NgModule({
  declarations: [
    ClientePesquisaComponent,
    ClienteCadastroComponent,
    NavbarComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    FormsModule,
    DropdownModule,
    InputMaskModule,
    HttpClientModule,
    RouterModule
    
  ],
  providers: [{
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
    /* useFactory(http: Http, options: RequestOptions) {
      return new AuthHttp(new AuthConfig(), http, options);
    } */
  }, ClienteService, AuthHttp, JwtHelper ],  bootstrap: []
})
export class ClienteModule { }

