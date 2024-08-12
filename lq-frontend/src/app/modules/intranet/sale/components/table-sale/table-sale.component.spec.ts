import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSaleComponent } from './table-sale.component';

describe('TableProductsComponent', () => {
  let component: TableSaleComponent;
  let fixture: ComponentFixture<TableSaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableSaleComponent]
    });
    fixture = TestBed.createComponent(TableSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
