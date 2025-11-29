import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  log(message: string, ...args: unknown[]): void {
    console.log(`[LOG] ${message}`, ...args);
  }

  error(message: string, error?: unknown): void {
    console.error(`[ERROR] ${message}`, error);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }
}

