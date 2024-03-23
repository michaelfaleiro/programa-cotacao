import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { ProdutoService } from '../../services/produto/produto.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IPreco } from '../../interface/IPreco';
import { MessageService } from '../../services/message.service';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-modal-preco',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-preco.component.html',
  styleUrl: './modal-preco.component.css',
})
export class ModalPrecoComponent {
  @Input() preco: IPreco = <IPreco>{};
  @Input() produtoId: string | null = null;

  @Output() isModalPreco = new EventEmitter<void>();
  @Output() updatePreco = new EventEmitter<void>();

  precoForm!: FormGroup;
  isBusy: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.precoForm = this.formBuilder.group({
      id: [this.preco.id],
      fornecedor: [
        this.preco.fornecedor,
        Validators.compose([Validators.required]),
      ],
      sku: [this.preco.sku],
      quantidadeAtendida: [
        this.preco.quantidadeAtendida,
        Validators.compose([Validators.min(1)]),
      ],
      marca: [this.preco.marca],
      precoCusto: [
        this.preco.precoCusto,
        Validators.compose([Validators.required]),
      ],
      precoVenda: [
        this.preco.precoVenda,
        Validators.compose([Validators.required]),
      ],
    });
  }

  closeModal() {
    this.isModalPreco.emit();
  }

  submit(produtoId: string | null) {
    if (this.precoForm.valid) {
      this.isBusy = true;

      if (this.preco.id) {
        this.produtoService
          .putPrecoProduto(produtoId!, this.precoForm.value)
          .pipe(
            tap(() => {
              this.isBusy = false;
              this.updatePreco.emit();
              this.closeModal();
              this.messageService.add(
                'Preço atualizado com sucesso!',
                'success'
              );
            }),
            catchError((error) => {
              this.messageService.add('Falha ao atualizar preço', 'danger');
              this.isBusy = false;
              throw error;
            })
          )
          .subscribe();
      } else {
        this.produtoService
          .addPrecoProduto(produtoId!, this.precoForm.value)
          .pipe(
            tap(() => {
              this.isBusy = false;
              this.updatePreco.emit();
              this.closeModal();
              this.messageService.add(
                'Preço cadastrado com sucesso!',
                'success'
              );
            }),
            catchError((error) => {
              this.messageService.add('Falha ao cadastrar preço', 'danger');
              this.isBusy = false;
              throw error;
            })
          )
          .subscribe();
      }
    }
  }

  isObjectEmpty(obj: any): boolean {
    return obj !== null && Object.keys(obj).length === 0;
  }
}
