import { Email } from './email.model';
import { Telefone } from './telefone-model';
import { Endereco } from './endereco.model';

export class Cliente{
    public id:Number;
    private nome:string;
    private cpf:string;
    private endereco:Endereco=new Endereco();
    public telefones:Array<Telefone> = new Array<Telefone>() ;
    public emails:Array<Email> = new Array<Email>();
    // public telefones:Telefone[] = [];
}