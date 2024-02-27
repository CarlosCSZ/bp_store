import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnChanges {
  qtyFilter: number[] = [5, 10, 20];
  showDropdown: boolean = false;
  selectedQty: number = 5;
  @Input() resultQty: number = 5;
  @Output() qtyChanged = new EventEmitter<number>();
  @Input() totalProducts: number | null = null;
  total: number = 0;
  page: number = 0;
  @Output() pageChanged = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalProducts']) {
      this.calculatePagination();
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectQty(quantity: number) {
    this.selectedQty = quantity;
    this.qtyChanged.emit(quantity);
    this.calculatePagination();
    this.toggleDropdown();
  }

  calculatePagination() {
    if (this.totalProducts) {
      this.total = Math.ceil(this.totalProducts / this.selectedQty);
      this.page = 1;
    }
  }

  prevPage() {
    this.page -= 1;
    this.pageChanged.emit(this.page);
  }

  nextPage() {
    this.page += 1;
    this.pageChanged.emit(this.page);
  }
}
