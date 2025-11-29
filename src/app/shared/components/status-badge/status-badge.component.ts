import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { TicketStatus } from '../../../domain/entities/ticket.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule, TagModule],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: TicketStatus;

  readonly statusConfig: Record<
    TicketStatus,
    { label: string; severity: 'success' | 'info' | 'warn' | 'danger' | 'secondary' }
  > = {
    open: { label: 'Open', severity: 'info' },
    in_progress: { label: 'In Progress', severity: 'warn' },
    resolved: { label: 'Resolved', severity: 'success' },
    closed: { label: 'Closed', severity: 'secondary' },
  };

  get config() {
    return this.statusConfig[this.status];
  }
}

