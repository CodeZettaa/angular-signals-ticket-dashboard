export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Ticket {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: TicketStatus;
  readonly priority: TicketPriority;
  readonly assignee?: string;
  readonly createdAt: string | Date;
  readonly updatedAt?: string | Date;
  readonly tags?: readonly string[];
}

export interface CreateTicketDto {
  readonly title: string;
  readonly description: string;
  readonly status: TicketStatus;
  readonly priority: TicketPriority;
  readonly assignee?: string;
  readonly tags?: readonly string[];
}

export interface UpdateTicketDto {
  readonly title?: string;
  readonly description?: string;
  readonly status?: TicketStatus;
  readonly priority?: TicketPriority;
  readonly assignee?: string;
  readonly tags?: readonly string[];
}

