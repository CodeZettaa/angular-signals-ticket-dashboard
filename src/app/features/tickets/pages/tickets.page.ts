import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TicketsStore } from '../store/tickets.store';
import { TicketFiltersComponent } from '../components/ticket-filters/ticket-filters.component';
import { TicketListComponent } from '../components/ticket-list/ticket-list.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-tickets-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    TicketFiltersComponent,
    TicketListComponent,
    LoadingSpinnerComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './tickets.page.html',
  styleUrl: './tickets.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly confirmationService = inject(ConfirmationService);
  readonly store = inject(TicketsStore);

  readonly tickets = this.store.filteredTickets;
  readonly loading = this.store.loading;
  readonly filter = this.store.filter;

  ngOnInit(): void {
    this.store.loadTickets();
  }

  onCreateTicket(): void {
    this.router.navigate(['/tickets/new']);
  }

  onViewTicket(id: string): void {
    this.router.navigate(['/tickets', id]);
  }

  onEditTicket(id: string): void {
    this.router.navigate(['/tickets', id, 'edit']);
  }

  onDeleteTicket(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this ticket?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.store.deleteTicket(id);
      },
    });
  }

  onFilterChange(filter: Parameters<typeof this.store.setFilter>[0]): void {
    this.store.setFilter(filter);
  }

  onClearFilters(): void {
    this.store.clearFilter();
  }
}
