import { Routes } from '@angular/router';
import { ItemComponent } from './components/item/item.component';

export const routes: Routes = [
  { path: 'item/:id', component: ItemComponent },
];
