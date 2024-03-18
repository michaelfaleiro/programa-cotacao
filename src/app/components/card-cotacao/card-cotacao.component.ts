import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICotacao } from '../../interface/iCotacao';

@Component({
  selector: 'app-card-cotacao',
  standalone: true,
  imports: [],
  templateUrl: './card-cotacao.component.html',
  styleUrl: './card-cotacao.component.css',
})
export class CardCotacaoComponent {
  @Input() cotacao: ICotacao = <ICotacao>{};

  @Output() editCotacao = new EventEmitter<string>();
  @Output() deleteCotacao = new EventEmitter<string>();

  edit(id: string) {
    this.editCotacao.emit(id);
  }

  delete(id: string) {
    this.deleteCotacao.emit(id);
  }
}
