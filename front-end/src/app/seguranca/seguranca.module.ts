import { ClienteService } from './../cliente/cliente.service';
import { ClientePesquisaComponent } from './../cliente/cliente-pesquisa/cliente-pesquisa.component';
import { ClienteCadastroComponent } from './../cliente/cliente-cadastro/cliente-cadastro.component';
import { NavbarComponent } from './../navbar/navbar.component';
import { AuthService } from './auth.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { RouterModule } from '@angular/router';
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

 
import {InputMaskModule} from 'primeng/inputmask';



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
    RouterModule,
    
  ],
  providers: [ClienteService,AuthService],
  bootstrap: []
})
export class SegurancaModule { }

