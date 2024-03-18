import { IPreco } from './IPreco';

export interface IProduto {
  id: string;
  sku?: string;
  nome: string;
  quantidade: number;
  precos: IPreco[];
  observacao?: string;
  createdAt: string;
  updatedAt: string;
}
