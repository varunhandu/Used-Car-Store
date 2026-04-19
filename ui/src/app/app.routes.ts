import {Routes} from '@angular/router';
import {GeneralSearch} from './GeneralSearch';
import {EnthusiastSearch} from './EnthusiastSearch';
import {CarResults} from './CarResults';

export const routes: Routes = [
  {path: '', component: GeneralSearch},
  {path: 'enthusiast', component: EnthusiastSearch},
  {path: 'results', component: CarResults},
];
