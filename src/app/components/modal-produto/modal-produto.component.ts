import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ICotacao} from "../../interface/iCotacao";
import {IProduto} from "../../interface/IProduto";
import {ProdutoService} from "../../services/produto/produto.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {CotacaoService} from "../../services/cotacao.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-modal-produto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-produto.component.html',
  styleUrl: './modal-produto.component.css',
})
export class ModalProdutoComponent {

  @Output() isModalProduto = new EventEmitter<void>();
  @Output() updateProduto = new EventEmitter<void>();

  @Input() produto: IProduto = <IProduto>{};
  produtoForm!: FormGroup;
  isBusy: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private cotacaoService: CotacaoService,
    private messageService: MessageService,
    private route: ActivatedRoute

  ) {}

  closeModal() {
    this.isModalProduto.emit();
  }
  ngOnInit() {
    this.produtoForm = this.formBuilder.group({
      id: [this.produto.id],
      nome : [this.produto.nome, Validators.compose([Validators.required])],
      sku: [
        this.produto.sku,
      ],
      quantidade: [
        this.produto.quantidade,
        Validators.compose([Validators.min(1)]),
      ],
      observacao: [this.produto.observacao],
    });
  }

  submit() {

    if (this.produtoForm.valid) {
      this.isBusy = true;


      if (this.produto.id) {
        this.produtoService.putProduto(this.produtoForm.value).subscribe(() => {
          this.updateProduto.emit();
          this.isBusy = false;
          this.isModalProduto.emit();
          this.messageService.add('Produto Atualizado com Sucesso', 'success');
        });
      } else {
        this.produtoService.postProduto(this.produtoForm.value).subscribe((produto) => {
          const idCotacao = this.route.snapshot.paramMap.get('id');
          this.cotacaoService.addProdutoCotacao(idCotacao!, produto.id).subscribe(
            () => {
              this.updateProduto.emit();
              this.isBusy = false;
              this.isModalProduto.emit();
              this.messageService.add('Produto Salvo com Sucesso', 'success');
            }
          );
        });
      }
    }
  }
  isObjectEmpty(obj: any): boolean {
    return obj !== null && Object.keys(obj).length === 0;
  }
}
