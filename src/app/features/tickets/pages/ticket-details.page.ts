import { Component, OnInit, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TicketDetailsComponent } from '../components/ticket-details/ticket-details.component';
import { TicketsStore } from '../store/tickets.store';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-ticket-details-page',
  standalone: true,
  imports: [CommonModule, ConfirmDialogModule, TicketDetailsComponent, LoadingSpinnerComponent],
  providers: [ConfirmationService],
  templateUrl: './ticket-details.page.html',
  styleUrl: './ticket-details.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDetailsPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly confirmationService = inject(ConfirmationService);
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

  onEdit(id: string): void {
    this.router.navigate(['/tickets', id, 'edit']);
  }

  onDelete(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this ticket?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.store.deleteTicket(id);
        this.router.navigate(['/tickets']);
      },
    });
  }

  onBack(): void {
    this.router.navigate(['/tickets']);
  }
}
