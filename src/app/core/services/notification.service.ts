import { Injectable, signal } from '@angular/core';

export interface Notification {
  readonly id: string;
  readonly message: string;
  readonly type: 'success' | 'error' | 'info' | 'warn';
  readonly timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly _notifications = signal<readonly Notification[]>([]);
  readonly notifications = this._notifications.asReadonly();

  show(message: string, type: Notification['type'] = 'info'): void {
    const notification: Notification = {
      id: crypto.randomUUID(),
      message,
      type,
      timestamp: new Date(),
    };

    this._notifications.update((notifications) => [...notifications, notification]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      this.remove(notification.id);
    }, 5000);
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  warn(message: string): void {
    this.show(message, 'warn');
  }

  remove(id: string): void {
    this._notifications.update((notifications) =>
      notifications.filter((n) => n.id !== id)
    );
  }

  clear(): void {
    this._notifications.set([]);
  }
}

