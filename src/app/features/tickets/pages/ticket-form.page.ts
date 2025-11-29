import { Component, OnInit, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketFormComponent } from '../components/ticket-form/ticket-form.component';
import { TicketsStore } from '../store/tickets.store';
import { CreateTicketDto } from '../../../domain/entities/ticket.model';

@Component({
  selector: 'app-ticket-form-page',
  standalone: true,
  imports: [CommonModule, TicketFormComponent],
  templateUrl: './ticket-form.page.html',
  styleUrl: './ticket-form.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketFormPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(TicketsStore);

  ticketId: string | null = null;

  readonly loading = this.store.loading;
  readonly ticket = computed(() => {
    if (!this.ticketId) {
      return null;
    }
    return this.store.getTicketById(this.ticketId) || null;
  });

  ngOnInit(): void {
    this.ticketId = this.route.snapshot.paramMap.get('id');
    if (this.ticketId) {
      this.store.loadTicketById(this.ticketId);
    }
  }

  onSubmit(dto: CreateTicketDto): void {
    if (this.ticketId) {
      this.store.updateTicket(this.ticketId, dto);
    } else {
      this.store.createTicket(dto);
    }
    this.router.navigate(['/tickets']);
  }

  onCancel(): void {
    this.router.navigate(['/tickets']);
  }
}

