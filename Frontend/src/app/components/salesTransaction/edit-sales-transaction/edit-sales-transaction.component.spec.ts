import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalesTransactionComponent } from './edit-sales-transaction.component';

describe('EditSalesTransactionComponent', () => {
  let component: EditSalesTransactionComponent;
  let fixture: ComponentFixture<EditSalesTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSalesTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSalesTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
