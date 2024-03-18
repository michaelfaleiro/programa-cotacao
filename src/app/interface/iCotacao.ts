import { IProduto } from './IProduto';

export interface ICotacao {
  id: string;
  carro: string;
  placa: string;
  chassi: string;
  status: string;
  observacao: string;
  produtoId: [];
  Produtos: IProduto[];
  createdAt: string;
  updatedAt: string;
}
