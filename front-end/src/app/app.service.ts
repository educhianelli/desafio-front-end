import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable } from "rxjs";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

export abstract class AppService<T>{
    
   

    private url: string = 'http://127.0.0.1:8080';
    constructor(protected http: HttpClient) { }

  protected abstract endpoint(): string;

  protected getUrl() {
    return `${this.url}/${this.endpoint()}`;
  }

  protected map(res: any) {
    return res;
  }


}