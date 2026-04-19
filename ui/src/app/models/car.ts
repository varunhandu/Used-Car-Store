export interface Car {
  id: number;
  manufacturer: string;
  model: string;
  price: number;
  mileage: number;
  engine_cc: number;
  power_bhp: number;
  body_type: string;
  fuel_type: string;
  transmission: string;
  safety_rating: number;
  average_user_rating: number;
}

export interface EnthusiastRequest {
  min_power: number;
  min_user_rating: number;
  transmission?: string | null;
  fuel_type?: string | null;
}

export type PreferenceType = 'efficiency' | 'performance' | 'comfort' | 'safety';

export interface EfficiencyPreference {
  preference_type: 'efficiency';
  min_mileage: number;
  body_type?: string;
  max_power?: number;
}

export interface PerformancePreference {
  preference_type: 'performance';
  min_power: number;
  min_engine_cc: number;
  body_type?: string;
}

export interface ComfortPreference {
  preference_type: 'comfort';
  body_type?: string;
  transmission?: string;
}

export interface SafetyPreference {
  preference_type: 'safety';
  min_safety_rating: number;
}

export type CarPreference = 
  | EfficiencyPreference 
  | PerformancePreference 
  | ComfortPreference 
  | SafetyPreference;

export interface GeneralRequest {
  preferences: CarPreference[];
}
