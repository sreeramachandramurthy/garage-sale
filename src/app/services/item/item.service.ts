import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../model/item/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  readonly url = 'items/items.json';

  constructor(private readonly http: HttpClient) {

  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.url);
  }
}
