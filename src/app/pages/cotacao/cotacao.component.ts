import { Component } from '@angular/core';
import { CardCotacaoComponent } from '../../components/card-cotacao/card-cotacao.component';
import { CotacaoService } from '../../services/cotacao.service';
import { Observable } from 'rxjs';
import { ICotacao } from '../../interface/iCotacao';
import { CommonModule } from '@angular/common';
import { ModalCotacaoComponent } from '../../components/modal-cotacao/modal-cotacao.component';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-cotacao',
  standalone: true,
  imports: [CommonModule, CardCotacaoComponent, ModalCotacaoComponent],
  templateUrl: './cotacao.component.html',
  styleUrl: './cotacao.component.css',
})
export class CotacaoComponent {
  cotacoes$ = new Observable<ICotacao[]>();
  cotacao: ICotacao = <ICotacao>{};

  isModalCotacao: boolean = false;

  constructor(
    private cotacaoService: CotacaoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getCotacoes();
  }

  showModalCotacao() {
    this.cotacao = <ICotacao>{};
    this.isModalCotacao = !this.isModalCotacao;
  }

  getCotacoes() {
    this.cotacoes$ = this.cotacaoService.getCotacoes();
    console.log(this.cotacoes$.forEach((cotacao) => console.log(cotacao)));
  }

  updateCotacao(cotacao: ICotacao) {
    this.cotacaoService.putCotacao(cotacao).subscribe(
      () => {
        this.cotacaoService.getCotacoes();
        this.messageService.add('Cotação atualizada com sucesso', 'success');
      },
      (error) => {
        this.messageService.add('Falha ao atualizar cotação', 'danger');
      }
    );
  }

  editCotacao(id: string) {
    this.cotacaoService.getOnecotacao(id).subscribe(
      (cotacao: ICotacao) => {
        this.cotacao = cotacao;
        this.isModalCotacao = true;
      },
      (error) => {
        this.messageService.add('Falha ao abrir cotação', 'danger');
      }
    );
  }

  deleteCotacao(id: string) {
    this.cotacaoService.deleteCotacao(id).subscribe(
      () => {
        this.cotacaoService.getCotacoes();
        this.messageService.add('Cotação deletada com sucesso', 'success');
        this.cotacoes$ = this.cotacaoService.getCotacoes();
      },
      (erro) => {
        this.messageService.add('Falha ao deletar cotação', 'danger');
      }
    );
  }
}
