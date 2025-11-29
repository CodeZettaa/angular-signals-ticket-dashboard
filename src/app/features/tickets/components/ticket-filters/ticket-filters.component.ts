import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TicketStatus, TicketPriority } from '../../../../domain/entities/ticket.model';
import { TicketFilter } from '../../store/tickets.store';

@Component({
  selector: 'app-ticket-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule, InputTextModule, ButtonModule],
  templateUrl: './ticket-filters.component.html',
  styleUrl: './ticket-filters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketFiltersComponent {
  @Input() filter: TicketFilter = {};
  @Output() filterChange = new EventEmitter<TicketFilter>();
  @Output() clearFilters = new EventEmitter<void>();

  readonly statusOptions: Array<{ label: string; value: TicketStatus | '' }> = [
    { label: 'All Statuses', value: '' },
    { label: 'Open', value: 'open' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Resolved', value: 'resolved' },
    { label: 'Closed', value: 'closed' },
  ];

  readonly priorityOptions: Array<{ label: string; value: TicketPriority | '' }> = [
    { label: 'All Priorities', value: '' },
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Critical', value: 'critical' },
  ];

  onStatusChange(status: TicketStatus | ''): void {
    this.filterChange.emit({ ...this.filter, status });
  }

  onPriorityChange(priority: TicketPriority | ''): void {
    this.filterChange.emit({ ...this.filter, priority });
  }

  onSearchChange(search: string): void {
    this.filterChange.emit({ ...this.filter, search });
  }

  onClearFilters(): void {
    this.clearFilters.emit();
  }
}

