import { Observable } from 'rxjs';
import { Cliente } from './model/cliente.model';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import { catchError, map } from 'rxjs/operators';
import { URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';


export interface ClienteFiltro{
    nome: string;
    cpf:string;
}


@Injectable()
export class ClienteService {
    private url: string = 'http://localhost:8080';
    protected endpoint() { return 'clientes';  }

    protected getUrl() {
        return `${this.url}/${this.endpoint()}`;
      }
    constructor(protected http: AuthHttp) { }

    

    public salvar(cliente: any) {
        return this.http.post(`${this.getUrl()}`, cliente);        
    }
    public deletar(id:number){
        return this.http.delete(`${this.getUrl()}/${id}`);
    }
    public buscarPorId(id:number): Observable<any> {
        return this.http.get(`${this.getUrl()}/${id}`);

    }


    pesquisar(filtro?:any): Observable<any>{
        const params = new URLSearchParams();
    
        if(filtro.nome != null){
          params.set('nome',filtro.nome);
        }
        console.log("FILTRO NOME:"+filtro.nome)
 
        if(filtro.cpf != null){
            params.set('cpf',filtro.cpf)
        }

        console.log("FILTRO CPF:"+filtro.cpf)

        console.log("PARAMS "+params)


        return this.http.get(`${this.getUrl()}`,{params: filtro} );
    

    }

    public listarTodos(): Observable<any> {
        return this.http.get(`${this.getUrl()}/listaTodos`);
    }

    public consultarEnderecoPeloCep(cep: string): Observable<any> {
        return this.http.get(`http://localhost:8080/enderecos/cep?cep= ${cep}`);
    }


}