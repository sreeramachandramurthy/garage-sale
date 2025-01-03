import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../../model/item/item.model';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  items: Item[] = [];
  categories: (string | undefined)[] = [];
  itemState: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.items);
  categoryState: BehaviorSubject<(string | undefined)[]> = new BehaviorSubject<(string | undefined)[]>(this.categories);

  constructor() { }

  load = async (data: Item[]) => {
    this.items = data;
    this.itemState.next(this.items);
    this.categories = this.items
      .map((item: Item) => {
        return item.category;
      })
      .filter((value: string | undefined, index: number, self: (string | undefined)[]) => {
        return self.indexOf(value) === index;
      });
    this.categoryState.next(this.categories);
  }

  getItem(id: number): Item|undefined {
    let item:Item[] = this.items.filter((item: Item) => {
      return item.id === id;
    });

    if (item.length > 0) {
      return item[0];
    } else {
      return undefined;
    }
  }
}
