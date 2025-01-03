import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { bootstrapMoonFill, bootstrapSunFill } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Theme } from '../../enums/theme/theme.enum';
import { Item } from '../../model/item/item.model';

@Component({
  selector: 'app-header',
  imports: [
    NgbDropdownModule,
    NgIcon
  ],
  providers: [
    provideIcons({
      bootstrapMoonFill,
      bootstrapSunFill
    })
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  collapsed = true;
  theme: Theme = Theme.Dark;
  icon = bootstrapSunFill;
  @Output() changeTheme = new EventEmitter<Theme>();
  @Input({ required: true }) items: Item[] = [];
  @Input({ required: true }) categories: (string | undefined)[] = [];

  constructor(private readonly router: Router) {

  }

  openHomePage() {
    this.router.navigate(['/']);
  }

  protected toggleNavigation() {
    this.collapsed = !this.collapsed;
  }

  viewItem(item: Item) {
    this.router.navigate(['/item', item.id]);
  }

  viewCategory(category: string | undefined) {
    //TODO: Need to be Implemented!
  }

  switchTheme() {
    if (this.theme === Theme.Light) {
      this.theme = Theme.Dark;
      this.icon = bootstrapSunFill;
    } else {
      this.theme = Theme.Light;
      this.icon = bootstrapMoonFill;
    }

    this.changeTheme.emit(this.theme);
  }
}
