import { Component } from '@angular/core';
import { CardCotacaoComponent } from '../../components/card-cotacao/card-cotacao.component';
import { CotacaoService } from '../../services/cotacao.service';
import { Observable, catchError, of, tap } from 'rxjs';
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
    try {
      this.getCotacoes();
    } catch (error) {
      this.messageService.add('Falha ao carregar cotações', 'danger');
    }
  }

  showModalCotacao() {
    this.cotacao = <ICotacao>{};
    this.isModalCotacao = !this.isModalCotacao;
  }

  getCotacoes() {
    this.cotacoes$ = this.cotacaoService.getCotacoes();
  }

  updateCotacao(cotacao: ICotacao) {
    this.cotacaoService
      .putCotacao(cotacao)
      .pipe(
        tap(() => {
          this.cotacaoService.getCotacoes();
          this.messageService.add('Cotação atualizada com sucesso', 'success');
        }),
        catchError((error) => {
          this.messageService.add('Falha ao atualizar cotação', 'danger');
          throw error;
        })
      )
      .subscribe();
  }

  editCotacao(id: string) {
    this.cotacaoService
      .getOnecotacao(id)
      .pipe(
        tap((cotacao: ICotacao) => {
          this.cotacao = cotacao;
          this.isModalCotacao = true;
        }),
        catchError((error) => {
          this.messageService.add('Falha ao abrir cotação', 'danger');
          throw error;
        })
      )
      .subscribe();
  }

  deleteCotacao(id: string) {
    this.cotacaoService
      .deleteCotacao(id)
      .pipe(
        tap(() => {
          this.cotacaoService.getCotacoes();
          this.messageService.add('Cotação deletada com sucesso', 'success');
          this.cotacoes$ = this.cotacaoService.getCotacoes();
        }),
        catchError((error) => {
          this.messageService.add('Falha ao deletar cotação', 'danger');
          throw error;
        })
      )
      .subscribe();
  }
}
