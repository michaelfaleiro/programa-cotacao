import { Component } from '@angular/core';
import { CotacaoService } from '../../services/cotacao.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICotacao } from '../../interface/iCotacao';
import { IProduto } from '../../interface/IProduto';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto/produto.service';
import { ModalProdutoComponent } from '../../components/modal-produto/modal-produto.component';
import { ModalCotacaoComponent } from '../../components/modal-cotacao/modal-cotacao.component';
import { MessageService } from '../../services/message.service';
import { IPreco } from '../../interface/IPreco';
import { ModalPrecoComponent } from '../../components/modal-preco/modal-preco.component';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Component({
  selector: 'app-detalhes-cotacao',
  standalone: true,
  imports: [
    CommonModule,
    ModalProdutoComponent,
    ModalCotacaoComponent,
    ModalPrecoComponent,
  ],
  templateUrl: './detalhes-cotacao.component.html',
  styleUrl: './detalhes-cotacao.component.css',
})
export class DetalhesCotacaoComponent {
  cotacao$ = new Observable<ICotacao>();
  produto$ = new Observable<IProduto>();
  precoProduto$ = new Observable<IProduto>();

  produto: IProduto = <IProduto>{};
  preco: IPreco = <IPreco>{};
  produtoId: string = '';

  isModalProduto: boolean = false;
  isModalPreco: boolean = false;

  constructor(
    private cotacaoService: CotacaoService,
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCotacao();
  }

  showModalProduto() {
    this.produto = <IProduto>{};
    this.isModalProduto = !this.isModalProduto;
  }

  showModalPreco() {
    this.preco = <IPreco>{};
    this.isModalPreco = !this.isModalPreco;
  }

  listarPreco(id: string) {
    this.produtoService.getOneProduto(id).subscribe((produto) => {
      this.precoProduto$ = this.produtoService.getOneProduto(id);
    });
  }

  getCotacao() {
    const id = this.route.snapshot.paramMap.get('id');
    this.cotacao$ = this.cotacaoService.getOnecotacao(id!);
  }

  getProdutoById(id: string) {
    this.produtoService.getOneProduto(id).subscribe((produto) => {
      this.produto$ = this.produtoService.getOneProduto(id);
    });
  }

  editProduto(id: string) {
    this.produtoService.getOneProduto(id).subscribe(
      (produto: IProduto) => {
        this.produto = produto;
        this.isModalProduto = true;
      },
      (error) => {
        this.messageService.add('Falha ao abrir produto', 'danger');
      }
    );
  }

  deleteProduto(id: string) {
    this.produtoService.deleteProduto(id).subscribe(
      () => {
        this.getCotacao();
        this.messageService.add('Produto deletado com sucesso', 'success');
      },
      (error) => {
        this.messageService.add('Falha ao deletar produto', 'danger');
      }
    );
  }
}
