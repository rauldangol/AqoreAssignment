import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesTransactionComponent } from './add-sales-transaction.component';

describe('AddSalesTransactionComponent', () => {
  let component: AddSalesTransactionComponent;
  let fixture: ComponentFixture<AddSalesTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalesTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalesTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
