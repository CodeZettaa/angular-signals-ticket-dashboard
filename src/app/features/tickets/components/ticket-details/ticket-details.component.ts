import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { Ticket } from '../../../../domain/entities/ticket.model';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { PriorityBadgeComponent } from '../../../../shared/components/priority-badge/priority-badge.component';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    TagModule,
    DividerModule,
    StatusBadgeComponent,
    PriorityBadgeComponent,
  ],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDetailsComponent {
  @Input({ required: true }) ticket!: Ticket;
  @Input() loading = false;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() back = new EventEmitter<void>();

  onEdit(): void {
    this.edit.emit(this.ticket.id);
  }

  onDelete(): void {
    this.delete.emit(this.ticket.id);
  }

  onBack(): void {
    this.back.emit();
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleString();
  }
}

