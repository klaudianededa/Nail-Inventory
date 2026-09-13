import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEsmaltesComponent } from './lista-esmaltes.component';

describe('ListaEsmaltesComponent', () => {
  let component: ListaEsmaltesComponent;
  let fixture: ComponentFixture<ListaEsmaltesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEsmaltesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEsmaltesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
