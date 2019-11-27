import { Cliente } from './../../model/cliente.model';
import { Email } from './../../model/email.model';
import { Telefone } from './../../model/telefone-model';
import { Endereco } from './../../model/endereco.model';
import { map, catchError } from 'rxjs/operators';
import { ClienteService } from '../cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Form } from '@angular/forms';
import {SelectItem} from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})

export class ClienteCadastroComponent implements OnInit {
  cep: String;
  formulario: FormGroup;
  cliente= new Cliente;
  endereco: Endereco = new Endereco();
  clientePersist: any;
  contTelefone: any;
  contEmail: any;
  telefones: Telefone[] = [{ numero: '', tipoTelefone: '' }];
  emails: Email[] = [{ email: '' }];
  validaMascaraTelefone: any;
  tiposTelefones: SelectItem[]; 
  clientes:Array<Cliente>;

  constructor(private clienteService: ClienteService,
              private route: ActivatedRoute,
              private router:Router) { }


 




  ngOnInit() {
    const idCliente = this.route.snapshot.params['codigo']
    if(idCliente){
      this.populaClienteEdicao(idCliente);
    }
    this.contTelefone = 0;
    this.contEmail = 0;
    this.cliente;

    this.tiposTelefones = [
      {label:'Selecione o tipo do telefone', value:null},
      {label:'Residencial', value:'RESIDENCIAL'},
      {label:'Comercial', value: 'COMERCIAL'},
      {label:'Celular', value:'CELULAR'}
   
  ];
  
 
  }

  onBlurVerificaMascara(){
     if(this.telefones[this.contTelefone].tipoTelefone != 'CELULAR'){
      this.validaMascaraTelefone = "(00) 0000-0000"
    }else{
      this.validaMascaraTelefone = "(00) 0 0000-0000"
    }
  }
  listaClientes(){
    this.clienteService.listarTodos().subscribe(res => {
      this.clientes = res;
    });
  }
  adicionaEmail() {
    this.emails.push(new Email());
    this.contEmail++;
  }
  adicionaTelefone() {
    this.telefones.push(new Telefone());
    this.contTelefone++;
  }
  onBlurEmail() {
    if (this.cliente.emails[this.contEmail] != this.emails[this.contEmail])
      this.cliente.emails.push(this.emails[this.contEmail]);
  }
  onBlurTelefone() {
    if (this.cliente.telefones[this.contTelefone] != this.telefones[this.contTelefone]){
       this.cliente.telefones.push(this.telefones[this.contTelefone]);
    }
  }
  removeTelefone() {
    if (this.telefones.length - 1 > 0) {
      if (this.telefones.length == this.cliente.telefones.length)
        this.cliente.telefones.splice(this.telefones.length - 1, 1);
      this.telefones.splice(this.telefones.length - 1, 1);
      this.contTelefone--;
    }
  }

  removeEmail() {
    if (this.emails.length - 1 > 0) {
      if (this.emails.length == this.cliente.emails.length)
        this.cliente.emails.splice(this.emails.length - 1, 1);
      this.emails.splice(this.emails.length - 1, 1);
      this.contTelefone--;
    }
  }

  get editando(){
    return Boolean(this.cliente.id);
  }

  salvar(cliente: any) {
    this.clienteService.salvar(cliente).subscribe(res => {
      this.router.navigate(['/clientes']);

    });
  }

  populaClienteEdicao(id:number){
      this.clienteService.buscarPorId(id).subscribe(
        res => {
          this.cliente = JSON.parse(res._body);
          this.telefones = this.cliente.telefones;
          this.emails = this.cliente.emails;

        });
  }




  getEndereco(cep, form) {
    cep = cep.replace(/\D/g, "");
    if (cep != "") {
      var validaCep = /^[0-9]{8}$/;
    }
    if (validaCep.test(cep)) {
      this.clienteService.consultarEnderecoPeloCep(cep)
        .subscribe(res => {
           this.populaFormEndereco(JSON.parse(res._body), form),
            err => console.log(err)
        });
    }


    console.log(cep);
  }

  populaFormEndereco(dados, form) {
    form.form.patchValue({
      endereco:
      {
        cep: dados.cep,
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        estado: dados.localidade,
        complemento: dados.complemento,
        uf: dados.uf
      }
    });


  }


}
