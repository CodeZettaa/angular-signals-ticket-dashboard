import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { Ticket } from '../../../../domain/entities/ticket.model';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { PriorityBadgeComponent } from '../../../../shared/components/priority-badge/priority-badge.component';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    TooltipModule,
    StatusBadgeComponent,
    PriorityBadgeComponent,
  ],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketListComponent {
  @Input({ required: true }) tickets: Ticket[] = [];
  @Input() loading = false;
  @Input() selectedTicketId: string | null = null;
  @Output() viewTicket = new EventEmitter<string>();
  @Output() editTicket = new EventEmitter<string>();
  @Output() deleteTicket = new EventEmitter<string>();

  readonly cols = [
    { field: 'title', header: 'Title' },
    { field: 'status', header: 'Status' },
    { field: 'priority', header: 'Priority' },
    { field: 'assignee', header: 'Assignee' },
    { field: 'createdAt', header: 'Created' },
    { field: 'actions', header: 'Actions' },
  ];

  onView(id: string): void {
    this.viewTicket.emit(id);
  }

  onEdit(id: string): void {
    this.editTicket.emit(id);
  }

  onDelete(id: string): void {
    this.deleteTicket.emit(id);
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString();
  }
}

