import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CotacaoService } from '../../services/cotacao.service';
import { ICotacao } from '../../interface/iCotacao';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-modal-cotacao',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './modal-cotacao.component.html',
  styleUrl: './modal-cotacao.component.css',
})
export class ModalCotacaoComponent {
  @Output() isModalCotacao = new EventEmitter<void>();
  @Output() updateCotacao = new EventEmitter<void>();

  @Input() cotacao: ICotacao = <ICotacao>{};

  isBusy: boolean = false;
  cotacaoForm!: FormGroup;

  constructor(
    private cotacaoService: CotacaoService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  closeModal() {
    this.isModalCotacao.emit();
  }

  ngOnInit() {
    this.cotacaoForm = this.formBuilder.group({
      id: [this.cotacao.id],
      carro: [this.cotacao.carro, Validators.compose([Validators.required])],
      placa: [
        this.cotacao.placa,
        Validators.compose([Validators.maxLength(7)]),
      ],
      chassi: [
        this.cotacao.chassi,
        Validators.compose([Validators.maxLength(17)]),
      ],
      observacao: [this.cotacao.observacao],
      status: [this.cotacao.status],
    });
  }

  submit() {
    if (this.cotacaoForm.valid) {
      this.isBusy = true;

      if (this.cotacao.id) {
        this.cotacaoService.putCotacao(this.cotacaoForm.value).subscribe(
          () => {
            this.isBusy = false;
            this.updateCotacao.emit();
            this.closeModal();
            this.messageService.add(
              'Cotação atualizada com sucesso',
              'success'
            );
          },
          (error) => {
            this.messageService.add(`Falha ao atualizar cotação`, 'danger');
            this.isBusy = false;
          }
        );
      } else {
        this.cotacaoService.postCotacao(this.cotacaoForm.value).subscribe(
          () => {
            this.isBusy = false;
            this.updateCotacao.emit();
            this.closeModal();
            this.messageService.add('Cotação salva com sucesso', 'success');
          },
          (error) => {
            this.messageService.add(`Falha ao salvar cotação`, 'danger');
            this.isBusy = false;
          }
        );
      }
    }
  }

  isObjectEmpty(obj: any): boolean {
    return obj !== null && Object.keys(obj).length === 0;
  }
}
