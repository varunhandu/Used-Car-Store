import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CarService} from './services/car';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-enthusiast-search',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  template: `
    <div class="flex h-full overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-80 bg-surface border-r border-border p-6 flex flex-col gap-6 shrink-0 overflow-y-auto">
        <div class="flex bg-bg p-1 rounded-lg border border-border">
          <button routerLink="/" class="flex-1 py-2 rounded-md font-semibold text-sm transition-all text-text-muted hover:text-text-main">
            General
          </button>
          <button class="flex-1 py-2 rounded-md font-semibold text-sm transition-all bg-surface shadow-sm text-primary">
            Enthusiast
          </button>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col flex-1">
          <div class="flex flex-col gap-6 mb-8">
            <div class="filter-section">
              <h3 class="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Engine & Power</h3>
              <div class="flex flex-col gap-4">
                <mat-form-field appearance="outline" class="w-full !m-0">
                  <mat-label>Min Power (BHP)</mat-label>
                  <input matInput type="number" formControlName="min_power">
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full !m-0">
                  <mat-label>Min User Rating</mat-label>
                  <input matInput type="number" step="0.1" formControlName="min_user_rating">
                </mat-form-field>
              </div>
            </div>

            <div class="filter-section">
              <h3 class="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Preferences</h3>
              <div class="flex flex-col gap-4">
                <mat-form-field appearance="outline" class="w-full !m-0">
                  <mat-label>Transmission</mat-label>
                  <mat-select formControlName="transmission">
                    <mat-option value="manual">Manual</mat-option>
                    <mat-option value="automatic">Automatic</mat-option>
                    <mat-option value="hybrid">Hybrid</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full !m-0">
                  <mat-label>Fuel Type</mat-label>
                  <mat-select formControlName="fuel_type">
                    <mat-option value="petrol">Petrol</mat-option>
                    <mat-option value="diesel">Diesel</mat-option>
                    <mat-option value="cng">CNG</mat-option>
                    <mat-option value="electric">Electric</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </div>
          </div>

          <button class="search-btn w-full flex items-center justify-center gap-2" 
                  [disabled]="form.invalid || isLoading()">
            @if (isLoading()) {
              <mat-icon class="animate-spin">sync</mat-icon>
              Fetching...
            } @else {
              Fetch Results
            }
          </button>
        </form>
      </aside>

      <!-- Results Preview Area -->
      <main class="flex-1 bg-bg p-8 flex flex-col items-center justify-center text-center">
        <div class="max-w-md">
          <div class="w-20 h-20 bg-surface rounded-3xl flex items-center justify-center shadow-sm mx-auto mb-6">
            <mat-icon class="!text-4xl text-primary">analytics</mat-icon>
          </div>
          <h2 class="text-2xl font-bold text-text-main mb-3">Technical Filtering</h2>
          <p class="text-text-muted">Enter your exact performance requirements to filter the inventory down to the machines that matter.</p>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }
    .filter-section h3 {
      font-size: 11px;
    }
    ::ng-deep .mat-mdc-form-field-subscript-wrapper {
      display: none;
    }
  `]
})
export class EnthusiastSearch {
  private carService = inject(CarService);
  private router = inject(Router);

  isLoading = this.carService.isLoading;
  error = this.carService.error;

  form = new FormGroup({
    min_power: new FormControl<number>(0, { validators: [Validators.required, Validators.min(0)], nonNullable: true }),
    min_user_rating: new FormControl<number>(0, { validators: [Validators.required, Validators.min(0), Validators.max(5)], nonNullable: true }),
    transmission: new FormControl<string | null>(null),
    fuel_type: new FormControl<string | null>(null),
  });

  onSubmit() {
    if (this.form.valid) {
      this.carService.getEnthusiastCars(this.form.getRawValue()).subscribe(() => {
        this.router.navigate(['/results']);
      });
    }
  }
}
