import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Ticket, CreateTicketDto, UpdateTicketDto } from '../../../domain/entities/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private tickets: Ticket[] = [
    {
      id: '1',
      title: 'Fix login authentication bug',
      description: 'Users are unable to log in with their credentials. Need to investigate the authentication flow.',
      status: 'open',
      priority: 'high',
      assignee: 'John Doe',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-16'),
      tags: ['bug', 'authentication', 'critical'],
    },
    {
      id: '2',
      title: 'Implement user dashboard',
      description: 'Create a new dashboard page for users to view their account information and activity.',
      status: 'in_progress',
      priority: 'medium',
      assignee: 'Jane Smith',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-17'),
      tags: ['feature', 'dashboard', 'ui'],
    },
    {
      id: '3',
      title: 'Optimize database queries',
      description: 'Review and optimize slow database queries to improve application performance.',
      status: 'in_progress',
      priority: 'high',
      assignee: 'Bob Johnson',
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-18'),
      tags: ['performance', 'database'],
    },
    {
      id: '4',
      title: 'Update documentation',
      description: 'Update API documentation with the latest endpoints and examples.',
      status: 'resolved',
      priority: 'low',
      assignee: 'Alice Williams',
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-14'),
      tags: ['documentation'],
    },
    {
      id: '5',
      title: 'Security vulnerability in payment module',
      description: 'Critical security issue found in the payment processing module. Immediate attention required.',
      status: 'open',
      priority: 'critical',
      assignee: 'Charlie Brown',
      createdAt: new Date('2024-01-19'),
      tags: ['security', 'critical', 'payment'],
    },
    {
      id: '6',
      title: 'Add dark mode support',
      description: 'Implement dark mode theme toggle for better user experience.',
      status: 'closed',
      priority: 'low',
      assignee: 'Diana Prince',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-13'),
      tags: ['feature', 'ui', 'theme'],
    },
  ];

  getTickets(): Observable<readonly Ticket[]> {
    return of([...this.tickets]).pipe(delay(500));
  }

  getTicketById(id: string): Observable<Ticket | undefined> {
    const ticket = this.tickets.find((t) => t.id === id);
    return of(ticket).pipe(delay(300));
  }

  createTicket(dto: CreateTicketDto): Observable<Ticket> {
    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tickets = [...this.tickets, newTicket];
    return of(newTicket).pipe(delay(400));
  }

  updateTicket(id: string, dto: UpdateTicketDto): Observable<Ticket> {
    const index = this.tickets.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Ticket with id ${id} not found`);
    }

    const updatedTicket: Ticket = {
      ...this.tickets[index],
      ...dto,
      updatedAt: new Date(),
    };

    this.tickets = [
      ...this.tickets.slice(0, index),
      updatedTicket,
      ...this.tickets.slice(index + 1),
    ];

    return of(updatedTicket).pipe(delay(400));
  }

  deleteTicket(id: string): Observable<boolean> {
    const index = this.tickets.findIndex((t) => t.id === id);
    if (index === -1) {
      return of(false).pipe(delay(300));
    }

    this.tickets = [...this.tickets.slice(0, index), ...this.tickets.slice(index + 1)];
    return of(true).pipe(delay(300));
  }
}

