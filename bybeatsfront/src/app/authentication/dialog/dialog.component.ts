import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  template: `
    <h1 mat-dialog-title style="background-color: grey; color: white;">Atualizar senha</h1>
    <div mat-dialog-content [formGroup]="passwordForm" style="background-color: grey;">
      <mat-form-field>
        <input matInput type="password" placeholder="Nova senha" formControlName="newPassword" class="white-placeholder">
        <mat-error *ngIf="passwordForm.get('newPassword').invalid && passwordForm.get('newPassword').touched">
          Senha deve ter no mínimo 8 caracteres.
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <input matInput type="password" placeholder="Confirme a nova senha" formControlName="confirmPassword" class="white-placeholder">
        <mat-error *ngIf="passwordForm.get('confirmPassword').invalid && passwordForm.get('confirmPassword').touched">
          Senhas não coincidem.
        </mat-error>
      </mat-form-field>
    </div>
    <div mat-dialog-actions style="background-color: grey;">
      <button mat-button (click)="onNoClick()" style="color: white; background-color: red;">Cancel</button>
      <button mat-button color="primary" [disabled]="passwordForm.invalid" style="color: white; background-color: red;">Update</button>
    </div>
  `,
})
export class DialogComponent {
  passwordForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder
  ) {
    this.passwordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}