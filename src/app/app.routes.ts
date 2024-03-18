import { Routes } from '@angular/router';
import { CotacaoComponent } from './pages/cotacao/cotacao.component';
import { DetalhesCotacaoComponent } from './pages/detalhes-cotacao/detalhes-cotacao.component';

export const routes: Routes = [
  { path: 'cotacao', component: CotacaoComponent, title: 'Cotações' },
  {
    path: 'cotacao/:id',
    component: DetalhesCotacaoComponent,
    title: 'Detalhes da Cotação',
  },
];
