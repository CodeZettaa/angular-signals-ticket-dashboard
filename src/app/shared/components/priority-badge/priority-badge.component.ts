import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { TicketPriority } from '../../../domain/entities/ticket.model';

@Component({
  selector: 'app-priority-badge',
  standalone: true,
  imports: [CommonModule, TagModule],
  templateUrl: './priority-badge.component.html',
  styleUrl: './priority-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriorityBadgeComponent {
  @Input({ required: true }) priority!: TicketPriority;

  readonly priorityConfig: Record<
    TicketPriority,
    { label: string; severity: 'success' | 'info' | 'warn' | 'danger' }
  > = {
    low: { label: 'Low', severity: 'success' },
    medium: { label: 'Medium', severity: 'info' },
    high: { label: 'High', severity: 'warn' },
    critical: { label: 'Critical', severity: 'danger' },
  };

  get config() {
    return this.priorityConfig[this.priority];
  }
}

