import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { Theme } from './enums/theme/theme.enum';
import { Item } from './model/item/item.model';
import { DataStoreService } from './services/data-store/data-store.service';
import { ItemService } from './services/item/item.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Garage Sale';
  theme: string = "dark";
  items: Item[] = [];
  categories: (string | undefined)[] = [];

  constructor(
    private readonly dataStoreService: DataStoreService,
    private readonly itemService: ItemService
  ) {

  }

  ngOnInit() {
    this.itemService.getItems().subscribe(
      (data: Item[]) => {
        this.dataStoreService.load(data);
      }
    );

    this.dataStoreService.itemState.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );

    this.dataStoreService.categoryState.subscribe(
      (categories: (string | undefined)[]) => {
        this.categories = categories;
      }
    );
  }

  switchTheme(theme: Theme) {
    if (theme === Theme.Light) {
      this.theme = Theme.Light;
    } else {
      this.theme = Theme.Dark;
    }
  }
}
