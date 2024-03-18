import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ICotacao} from "../interface/iCotacao";

@Injectable({
  providedIn: 'root'
})
export class CotacaoService {

  private apiUrl = `${environment.api}/cotacoes`;
  constructor(private http: HttpClient) { }

  getCotacoes(): Observable<ICotacao[]>{
    return this.http.get<ICotacao[]>(this.apiUrl);
  }
  getOnecotacao(id: string): Observable<ICotacao>{
    return this.http.get<ICotacao>(`${this.apiUrl}/${id}`);
  }
  postCotacao(cotacao: ICotacao): Observable<ICotacao>{
    return this.http.post<ICotacao>(this.apiUrl, cotacao);
  }

  putCotacao(cotacao: ICotacao): Observable<ICotacao>{
    return this.http.put<ICotacao>(`${this.apiUrl}/${cotacao.id}`, cotacao);
  }

  deleteCotacao(id: string): Observable<ICotacao>{
    return this.http.delete<ICotacao>(`${this.apiUrl}/${id}`);
  }

  addProdutoCotacao(cotacaoId: string, produtoId: string){
    return this.http.post(`${this.apiUrl}/addproduto`, {
      cotacaoId,
      produtoId
    });
  }
}
