import { Component, OnInit, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TicketsStore } from '../../tickets/store/tickets.store';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ChartModule, LoadingSpinnerComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit {
  readonly store = inject(TicketsStore);

  readonly totalTickets = this.store.totalTickets;
  readonly openTickets = this.store.openTickets;
  readonly criticalTickets = this.store.criticalTickets;
  readonly statsByStatus = this.store.statsByStatus;
  readonly statsByPriority = this.store.statsByPriority;
  readonly loading = this.store.loading;

  readonly statusChartData = computed(() => ({
    labels: ['Open', 'In Progress', 'Resolved', 'Closed'],
    datasets: [
      {
        data: [
          this.statsByStatus().open,
          this.statsByStatus().in_progress,
          this.statsByStatus().resolved,
          this.statsByStatus().closed,
        ],
        backgroundColor: ['#3B82F6', '#F59E0B', '#10B981', '#6B7280'],
        hoverBackgroundColor: ['#2563EB', '#D97706', '#059669', '#4B5563'],
      },
    ],
  }));

  readonly priorityChartData = computed(() => ({
    labels: ['Low', 'Medium', 'High', 'Critical'],
    datasets: [
      {
        label: 'Tickets by Priority',
        data: [
          this.statsByPriority().low,
          this.statsByPriority().medium,
          this.statsByPriority().high,
          this.statsByPriority().critical,
        ],
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
      },
    ],
  }));

  readonly chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  ngOnInit(): void {
    this.store.loadTickets();
  }
}

