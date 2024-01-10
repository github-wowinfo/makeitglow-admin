// toast.service.ts

import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) { }

  private defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    panelClass: '', // Add custom classes if needed
    horizontalPosition: 'end', // 'start' | 'center' | 'end' | 'left' | 'right'
    verticalPosition: 'top',   // 'top' | 'bottom'
  };

  showSuccess(message: string): void {
    const config = { ...this.defaultConfig, panelClass: 'success-toast' };
    this.snackBar.open(message, 'Close', config);
  }

  showError(message: string): void {
    const config = { ...this.defaultConfig, panelClass: 'error-toast' };
    this.snackBar.open(message, 'Close', config);
  }
}
