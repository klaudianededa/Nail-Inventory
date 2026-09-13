import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEsmalteComponent } from './cadastro-esmalte.component';

describe('CadastroEsmalteComponent', () => {
  let component: CadastroEsmalteComponent;
  let fixture: ComponentFixture<CadastroEsmalteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroEsmalteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEsmalteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
