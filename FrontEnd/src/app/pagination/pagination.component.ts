import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;

  @Output() pageChange = new EventEmitter<number>();

  onPageChange(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.pageChange.emit(pageNumber);
    }
  }
}
