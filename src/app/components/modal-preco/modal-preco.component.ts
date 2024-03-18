import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { ProdutoService } from '../../services/produto/produto.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IPreco } from '../../interface/IPreco';

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
    private formBuilder: FormBuilder
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

      this.produtoService
        .addPrecoProduto(produtoId!, this.precoForm.value)
        .subscribe((response) => {
          this.isBusy = false;
          this.updatePreco.emit();
          this.closeModal();
        });
    }
  }

  isObjectEmpty(obj: any): boolean {
    return obj !== null && Object.keys(obj).length === 0;
  }
}
