import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  qtyFilter: number[] = [5, 10, 20];
  showDropdown: boolean = false;
  selectedQty: number = 5;
  @Input() resultQty: number = 5;
  @Output() qtyChanged = new EventEmitter<number>();

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectQty(quantity: number) {
    this.selectedQty = quantity;
    this.qtyChanged.emit(quantity);
    this.toggleDropdown();
  }
}
