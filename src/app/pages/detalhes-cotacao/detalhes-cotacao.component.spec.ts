import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesCotacaoComponent } from './detalhes-cotacao.component';

describe('DetalhesCotacaoComponent', () => {
  let component: DetalhesCotacaoComponent;
  let fixture: ComponentFixture<DetalhesCotacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesCotacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesCotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
