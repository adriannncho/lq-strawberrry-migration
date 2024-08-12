import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-sale',
  templateUrl: './table-sale.component.html',
  styleUrls: ['./table-sale.component.css']
})
export class TableSaleComponent {
  @Input() sales!: number;

  constructor(
  ) { }
}
