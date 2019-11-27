import { AuthService } from './seguranca/auth.service';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';



import { AppComponent } from './app.component';
import { ClientePesquisaComponent } from './cliente/cliente-pesquisa/cliente-pesquisa.component';
import { ClienteCadastroComponent } from './cliente/cliente-cadastro/cliente-cadastro.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ClienteService } from './cliente/cliente.service';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { Routes, RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt';






const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'clientes', component: ClientePesquisaComponent },
  { path: 'clientes/novo', component: ClienteCadastroComponent },
  { path: 'clientes/:codigo', component: ClienteCadastroComponent }


];
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
   const config = new AuthConfig({
    globalHeaders: [
      {'Content-type': 'application/json'}
    ]
  });
  return new AuthHttp(config, http, options);
}
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {}



@NgModule({
  declarations: [
    AppComponent,
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
    NgxMaskModule.forRoot(options),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    PasswordModule,
    HttpModule,
   /*  AuthModule.forRoot(new AuthConfig({
      headerName: 'Authorization',
      headerPrefix: 'my-bearer-prefix',
      tokenName: 'my-token-name',
      tokenGetter: (() => localStorage.getItem('token') || ''),
      globalHeaders: [{ 'Content-Type': 'application/json' }],
      noJwtError: true
      })), */





  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }, ClienteService, AuthHttp, JwtHelper, AuthService, AUTH_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {

}
