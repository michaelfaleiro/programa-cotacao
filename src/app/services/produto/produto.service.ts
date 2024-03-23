import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduto } from '../../interface/IProduto';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IPreco } from '../../interface/IPreco';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiUrl = `${environment.api}/produtos`;

  constructor(private http: HttpClient) {}

  getOneProduto(id: string): Observable<IProduto> {
    return this.http.get<IProduto>(`${this.apiUrl}/${id}`);
  }

  getProdutos(): Observable<IProduto[]> {
    return this.http.get<IProduto[]>(this.apiUrl);
  }
  postProduto(produto: IProduto): Observable<IProduto> {
    return this.http.post<IProduto>(this.apiUrl, produto);
  }

  putProduto(produto: IProduto): Observable<IProduto> {
    return this.http.put<IProduto>(`${this.apiUrl}/${produto.id}`, produto);
  }

  deleteProduto(id: string): Observable<IProduto> {
    return this.http.delete<IProduto>(`${this.apiUrl}/${id}`);
  }

  addPrecoProduto(produtoId: string, preco: IPreco) {
    return this.http.post(`${this.apiUrl}/${produtoId}/addpreco`, preco);
  }

  removePrecoProduto(produtoId: string, precoId: string) {
    return this.http.delete(
      `${this.apiUrl}/${produtoId}/removepreco/${precoId}`
    );
  }

  putPrecoProduto(produtoId: string, preco: IPreco) {
    return this.http.put(`${this.apiUrl}/${produtoId}/updatepreco`, preco);
  }
}
