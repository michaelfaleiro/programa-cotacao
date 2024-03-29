import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CotacaoComponent } from './pages/cotacao/cotacao.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MessageComponent } from './components/message/message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CotacaoComponent,
    SidebarComponent,
    MessageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'programa-cotacao';
}
