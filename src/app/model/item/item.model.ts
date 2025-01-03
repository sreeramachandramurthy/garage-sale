export class Item {
  id: number = 0;
  name!: string|undefined;
  description!: string|undefined;
  price: number = 0;
  priceType!: string|undefined;
  category!: string|undefined;
  features!: (string|undefined)[];
  disclaimers!: (string|undefined)[];
  images!: (string|undefined)[];
}
