import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSalesTransactionsComponent } from './get-sales-transactions.component';

describe('GetSalesTransactionsComponent', () => {
  let component: GetSalesTransactionsComponent;
  let fixture: ComponentFixture<GetSalesTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSalesTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSalesTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
