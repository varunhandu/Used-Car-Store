import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DecimalPipe, CurrencyPipe} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {CarService} from './services/car';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-car-results',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    RouterLink,
    DecimalPipe,
    CurrencyPipe
  ],
  template: `
    <div class="flex h-full overflow-hidden">
      <!-- Sidebar / Summary -->
      <aside class="w-80 bg-surface border-r border-border p-6 flex flex-col gap-6 shrink-0 overflow-y-auto">
        <div class="mb-4">
          <h2 class="text-lg font-bold text-text-main mb-1">Recommended</h2>
          <p class="text-sm text-text-muted">Filtered based on your criteria</p>
        </div>

        <div class="p-4 bg-bg rounded-xl border border-border">
          <h3 class="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">Quick Navigation</h3>
          <nav class="flex flex-col gap-2">
            <button mat-button routerLink="/" class="!justify-start !text-text-main hover:!bg-surface">
              <mat-icon class="mr-2">search</mat-icon> New General Search
            </button>
            <button mat-button routerLink="/enthusiast" class="!justify-start !text-text-main hover:!bg-surface">
              <mat-icon class="mr-2">tune</mat-icon> Enthusiast Mode
            </button>
          </nav>
        </div>

        <div class="mt-auto pt-6 border-t border-border">
          <p class="text-xs text-text-muted italic">Showing {{ cars().length }} matches from inventory v2.1</p>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto bg-bg p-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-text-main">Top Picks For You</h2>
          <span class="text-sm text-text-muted">Found {{ cars().length }} results</span>
        </div>

        @if (cars().length > 0) {
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            @for (car of cars(); track car.id) {
              <div class="card">
                <div class="card-header border-b border-border p-4 flex justify-between items-start">
                  <div class="card-title">
                    <h4 class="text-lg font-bold text-text-main leading-tight">{{ car.manufacturer }} {{ car.model }}</h4>
                    <p class="text-sm text-text-muted">{{ car.body_type }} • {{ car.fuel_type }}</p>
                  </div>
                  <div class="text-xl font-bold text-primary font-mono whitespace-nowrap">
                    {{ car.price | currency:'USD':'symbol':'1.0-0' }}
                  </div>
                </div>
                
                <div class="p-4 grid grid-cols-2 gap-4">
                  <div class="flex flex-col gap-0.5">
                    <span class="text-[10px] text-text-muted uppercase font-semibold tracking-wider">Engine Power</span>
                    <span class="text-sm font-bold text-text-main">{{ car.power_bhp }} BHP</span>
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <span class="text-[10px] text-text-muted uppercase font-semibold tracking-wider">Transmission</span>
                    <span class="text-sm font-bold text-text-main capitalize">{{ car.transmission }}</span>
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <span class="text-[10px] text-text-muted uppercase font-semibold tracking-wider">Mileage</span>
                    <span class="text-sm font-bold text-text-main">{{ car.mileage }} kmpl</span>
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <span class="text-[10px] text-text-muted uppercase font-semibold tracking-wider">User Rating</span>
                    <div class="flex items-center gap-1.5">
                      <div class="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md text-xs font-bold border border-amber-100">
                        ⭐ {{ car.average_user_rating | number:'1.1-1' }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="px-4 pb-4 mt-auto">
                  <button mat-flat-button color="primary" class="w-full !rounded-lg !bg-primary !text-white !font-semibold">
                    View Full Inventory Details
                  </button>
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="h-full flex flex-col items-center justify-center text-center opacity-70">
            <mat-icon class="!text-6xl text-text-muted mb-4 font-light">find_in_page</mat-icon>
            <h3 class="text-xl font-bold text-text-main mb-2">No cars found</h3>
            <p class="text-text-muted max-w-xs">Try adjusting your filters in the sidebar to browse our full catalog.</p>
          </div>
        }
      </main>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }
  `]
})
export class CarResults {
  private carService = inject(CarService);
  cars = this.carService.results;
}
