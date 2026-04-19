import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CarService} from './services/car';
import {CarPreference} from './models/car';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-general-search',
  imports: [MatChipsModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="flex h-full overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-80 bg-surface border-r border-border p-6 flex flex-col gap-6 shrink-0 overflow-y-auto">
        <div class="flex bg-bg p-1 rounded-lg border border-border">
          <button class="flex-1 py-2 rounded-md font-semibold text-sm transition-all bg-surface shadow-sm text-primary">
            General
          </button>
          <button routerLink="/enthusiast" class="flex-1 py-2 rounded-md font-semibold text-sm transition-all text-text-muted hover:text-text-main">
            Enthusiast
          </button>
        </div>

        <div class="flex flex-col gap-4">
          <h3 class="text-xs font-bold uppercase tracking-widest text-text-muted">Your Priorities</h3>
          
          <mat-chip-listbox multiple (change)="onSelectionChange($event)" class="!flex !flex-col !gap-2">
            @for (pref of availablePreferences; track pref.id) {
              <mat-chip-option [value]="pref.id" class="custom-chip">
                <div class="flex items-center gap-2">
                  <mat-icon class="!text-lg">{{ pref.icon }}</mat-icon>
                  <span>{{ pref.label }}</span>
                </div>
              </mat-chip-option>
            }
          </mat-chip-listbox>
        </div>

        <button class="search-btn mt-auto" 
                [disabled]="selectedIds().length === 0"
                (click)="search()">
          Fetch Results
        </button>
      </aside>

      <!-- Results Preview Area -->
      <main class="flex-1 bg-bg p-8 flex flex-col items-center justify-center text-center">
        <div class="max-w-md">
          <div class="w-20 h-20 bg-surface rounded-3xl flex items-center justify-center shadow-sm mx-auto mb-6">
            <mat-icon class="!text-4xl text-primary">auto_awesome</mat-icon>
          </div>
          <h2 class="text-2xl font-bold text-text-main mb-3">Refine Your Selection</h2>
          <p class="text-text-muted">Select one or more priorities from the sidebar to start finding your perfect match.</p>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }
    ::ng-deep .custom-chip {
      --mdc-chip-label-text-color: var(--color-text-main);
      --mdc-chip-selected-label-text-color: #fff;
      --mdc-chip-elevated-container-color: var(--color-surface);
      --mdc-chip-selected-container-color: var(--color-primary);
      --mdc-chip-container-shape: 20px;
      border: 1px solid var(--color-border);
    }
    ::ng-deep .mat-mdc-chip-listbox .mat-mdc-chip-set-layout {
      flex-direction: column !important;
      gap: 8px !important;
    }
  `]
})
export class GeneralSearch {
  private carService = inject(CarService);
  private router = inject(Router);

  availablePreferences = [
    { id: 'efficiency', label: 'Efficiency', icon: 'bolt', payload: { preference_type: 'efficiency', min_mileage: 12, body_type: 'Hatchback', max_power: 100 } },
    { id: 'performance', label: 'Performance', icon: 'speed', payload: { preference_type: 'performance', min_power: 100, min_engine_cc: 1200, body_type: 'Sedan' } },
    { id: 'comfort', label: 'Comfort', icon: 'weekend', payload: { preference_type: 'comfort', body_type: 'SUV', transmission: 'Automatic' } },
    { id: 'safety', label: 'Safety', icon: 'security', payload: { preference_type: 'safety', min_safety_rating: 3 } },
  ];

  selectedIds = signal<string[]>([]);
  error = this.carService.error;

  onSelectionChange(event: { value: string[] }) {
    this.selectedIds.set(event.value);
  }

  search() {
    const preferences: CarPreference[] = this.availablePreferences
      .filter(p => this.selectedIds().includes(p.id))
      .map(p => p.payload as CarPreference);

    this.carService.getGeneralCars({ preferences }).subscribe(() => {
      this.router.navigate(['/results']);
    });
  }
}
