import { Injectable, signal, computed } from '@angular/core';
import {
  Ticket,
  CreateTicketDto,
  UpdateTicketDto,
  TicketStatus,
  TicketPriority,
} from '../../../domain/entities/ticket.model';
import { TicketService } from '../services/ticket.service';
import { LoggerService, NotificationService } from '../../../core';

export interface TicketFilter {
  readonly status?: TicketStatus | '';
  readonly priority?: TicketPriority | '';
  readonly search?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TicketsStore {
  private readonly _tickets = signal<readonly Ticket[]>([]);
  private readonly _selectedTicketId = signal<string | null>(null);
  private readonly _filter = signal<TicketFilter>({});
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // Public readonly signals
  readonly tickets = this._tickets.asReadonly();
  readonly selectedTicketId = this._selectedTicketId.asReadonly();
  readonly filter = this._filter.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed signals
  readonly filteredTickets = computed(() => {
    const tickets = this._tickets();
    const filter = this._filter();

    return tickets.filter(ticket => {
      if (filter.status !== undefined && filter.status !== '') {
        if (ticket.status !== filter.status) {
          return false;
        }
      }
      if (filter.priority !== undefined && filter.priority !== '') {
        if (ticket.priority !== filter.priority) {
          return false;
        }
      }
      if (filter.search && filter.search.trim() !== '') {
        const searchLower = filter.search.toLowerCase();
        return (
          ticket.title.toLowerCase().includes(searchLower) ||
          ticket.description.toLowerCase().includes(searchLower) ||
          ticket.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      return true;
    });
  });

  readonly statsByStatus = computed(() => {
    const tickets = this._tickets();
    const stats: Record<TicketStatus, number> = {
      open: 0,
      in_progress: 0,
      resolved: 0,
      closed: 0,
    };

    tickets.forEach(ticket => {
      stats[ticket.status]++;
    });

    return stats;
  });

  readonly statsByPriority = computed(() => {
    const tickets = this._tickets();
    const stats: Record<TicketPriority, number> = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0,
    };

    tickets.forEach(ticket => {
      stats[ticket.priority]++;
    });

    return stats;
  });

  readonly totalTickets = computed(() => this._tickets().length);

  readonly openTickets = computed(() => {
    return this._tickets().filter(t => t.status === 'open').length;
  });

  readonly criticalTickets = computed(() => {
    return this._tickets().filter(t => t.priority === 'critical').length;
  });

  constructor(
    private readonly ticketService: TicketService,
    private readonly logger: LoggerService,
    private readonly notification: NotificationService
  ) {}

  loadTickets(): void {
    this._loading.set(true);
    this._error.set(null);

    this.ticketService.getTickets().subscribe({
      next: tickets => {
        this._tickets.set(tickets);
        this._loading.set(false);
        this.logger.log('Tickets loaded successfully', tickets.length);
      },
      error: error => {
        this._error.set('Failed to load tickets');
        this._loading.set(false);
        this.logger.error('Failed to load tickets', error);
        this.notification.error('Failed to load tickets');
      },
    });
  }

  loadTicketById(id: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.ticketService.getTicketById(id).subscribe({
      next: ticket => {
        if (ticket) {
          this._selectedTicketId.set(id);
          // Update the ticket in the list if it exists
          const tickets = this._tickets();
          const index = tickets.findIndex(t => t.id === id);
          if (index !== -1) {
            this._tickets.set([...tickets.slice(0, index), ticket, ...tickets.slice(index + 1)]);
          }
        }
        this._loading.set(false);
      },
      error: error => {
        this._error.set('Failed to load ticket');
        this._loading.set(false);
        this.logger.error('Failed to load ticket', error);
        this.notification.error('Failed to load ticket');
      },
    });
  }

  createTicket(dto: CreateTicketDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.ticketService.createTicket(dto).subscribe({
      next: ticket => {
        this._tickets.update(tickets => [...tickets, ticket]);
        this._loading.set(false);
        this.logger.log('Ticket created successfully', ticket.id);
        this.notification.success('Ticket created successfully');
      },
      error: error => {
        this._error.set('Failed to create ticket');
        this._loading.set(false);
        this.logger.error('Failed to create ticket', error);
        this.notification.error('Failed to create ticket');
      },
    });
  }

  updateTicket(id: string, dto: UpdateTicketDto): void {
    this._loading.set(true);
    this._error.set(null);

    this.ticketService.updateTicket(id, dto).subscribe({
      next: updatedTicket => {
        this._tickets.update(tickets => tickets.map(t => (t.id === id ? updatedTicket : t)));
        this._loading.set(false);
        this.logger.log('Ticket updated successfully', id);
        this.notification.success('Ticket updated successfully');
      },
      error: error => {
        this._error.set('Failed to update ticket');
        this._loading.set(false);
        this.logger.error('Failed to update ticket', error);
        this.notification.error('Failed to update ticket');
      },
    });
  }

  deleteTicket(id: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.ticketService.deleteTicket(id).subscribe({
      next: wasDeleted => {
        if (wasDeleted) {
          this._tickets.update(tickets => tickets.filter(t => t.id !== id));
          if (this._selectedTicketId() === id) {
            this._selectedTicketId.set(null);
          }
          this._loading.set(false);
          this.logger.log('Ticket deleted successfully', id);
          this.notification.success('Ticket deleted successfully');
        } else {
          this._error.set('Ticket not found');
          this._loading.set(false);
          this.notification.error('Ticket not found');
        }
      },
      error: error => {
        this._error.set('Failed to delete ticket');
        this._loading.set(false);
        this.logger.error('Failed to delete ticket', error);
        this.notification.error('Failed to delete ticket');
      },
    });
  }

  selectTicket(id: string | null): void {
    this._selectedTicketId.set(id);
  }

  setFilter(filter: Partial<TicketFilter>): void {
    this._filter.update(current => ({ ...current, ...filter }));
  }

  clearFilter(): void {
    this._filter.set({});
  }

  getTicketById(id: string): Ticket | undefined {
    return this._tickets().find(t => t.id === id);
  }
}
