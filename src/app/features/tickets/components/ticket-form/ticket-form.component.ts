import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Ticket, CreateTicketDto, TicketStatus, TicketPriority } from '../../../../domain/entities/ticket.model';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketFormComponent implements OnInit {
  @Input() ticket: Ticket | null = null;
  @Input() loading = false;
  @Output() submit = new EventEmitter<CreateTicketDto>();
  @Output() cancel = new EventEmitter<void>();

  ticketForm!: FormGroup;
  readonly isEditMode = false;

  readonly statusOptions: Array<{ label: string; value: TicketStatus }> = [
    { label: 'Open', value: 'open' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Resolved', value: 'resolved' },
    { label: 'Closed', value: 'closed' },
  ];

  readonly priorityOptions: Array<{ label: string; value: TicketPriority }> = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Critical', value: 'critical' },
  ];

  constructor(private readonly fb: FormBuilder) {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: ['open', Validators.required],
      priority: ['medium', Validators.required],
      assignee: [''],
      tags: [[] as string[]],
    });
  }

  ngOnInit(): void {
    if (this.ticket) {
      this.ticketForm.patchValue({
        title: this.ticket.title,
        description: this.ticket.description,
        status: this.ticket.status,
        priority: this.ticket.priority,
        assignee: this.ticket.assignee || '',
        tags: this.ticket.tags || [],
      });
    }
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      this.submit.emit(this.ticketForm.value as CreateTicketDto);
    } else {
      this.ticketForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  get title() {
    return this.ticketForm.get('title');
  }

  get description() {
    return this.ticketForm.get('description');
  }

  onTagsInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const tags = input.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    this.ticketForm.patchValue({ tags });
  }
}

