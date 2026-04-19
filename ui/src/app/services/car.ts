import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Car, EnthusiastRequest, GeneralRequest } from "../models/car";

@Injectable({
  providedIn: "root",
})
export class CarService {
  private http = inject(HttpClient);
  private apiUrl = "https://used-car-store-5equ.onrender.com";

  results = signal<Car[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  getEnthusiastCars(filters: EnthusiastRequest): Observable<Car[]> {
    this.isLoading.set(true);
    this.error.set(null);
    return this.http
      .post<Car[]>(`${this.apiUrl}/recommend/enthusiast`, filters)
      .pipe(
        tap({
          next: (cars) => {
            this.results.set(cars);
            this.isLoading.set(false);
          },
          error: () => {
            this.error.set("Failed to fetch cars. Please try again.");
            this.isLoading.set(false);
          },
        }),
      );
  }

  getGeneralCars(request: GeneralRequest): Observable<Car[]> {
    this.isLoading.set(true);
    this.error.set(null);
    return this.http
      .post<Car[]>(`${this.apiUrl}/recommend/general`, request)
      .pipe(
        tap({
          next: (cars) => {
            this.results.set(cars);
            this.isLoading.set(false);
          },
          error: () => {
            this.error.set("Failed to fetch cars. Please try again.");
            this.isLoading.set(false);
          },
        }),
      );
  }
}
