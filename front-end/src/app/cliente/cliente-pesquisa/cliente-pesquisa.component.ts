import { AuthService } from './../../seguranca/auth.service';
import { ClienteFiltro } from '../cliente.service';
import { Cliente } from './../../model/cliente.model';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-pesquisa',
  templateUrl: './cliente-pesquisa.component.html',
  styleUrls: ['./cliente-pesquisa.component.css']
})
export class ClientePesquisaComponent  implements OnInit{

  nome:string = ''
  cpf:string = '';
  clientes:Array<Cliente>;
  clientesPesquisa:Array<Cliente>;

  cliente:any;
  ngOnInit(){
    this.listaClientes();
   }


   

  constructor(private clienteService:ClienteService,
              private auth: AuthService
             ){
               this.clientes;
             }
 
  listaClientes(){
    this.clienteService.listarTodos().subscribe(res => {
      this.clientes = JSON.parse(res._body) ;   
    });
  }

  excluir(cliente: any){
    this.clienteService.deletar(cliente.id).subscribe(res=>{
      this.listaClientes();
    })
  }

  filtrarCliente(){
    const filtro: ClienteFiltro = {
      nome:this.nome,
      cpf:this.cpf
    };

    
    this.clienteService.pesquisar(filtro).subscribe(res =>{
      this.clientes = new Array<Cliente>();
      this.clientes = JSON.parse(res._body);
    })
  }
}

