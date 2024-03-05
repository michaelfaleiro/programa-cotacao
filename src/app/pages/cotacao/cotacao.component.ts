import { Component } from '@angular/core';
import {CardCotacaoComponent} from "../../components/card-cotacao/card-cotacao.component";

@Component({
  selector: 'app-cotacao',
  standalone: true,
  imports: [CardCotacaoComponent],
  templateUrl: './cotacao.component.html',
  styleUrl: './cotacao.component.css'
})
export class CotacaoComponent {

}
