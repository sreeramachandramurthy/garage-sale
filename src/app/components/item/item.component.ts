import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../../model/item/item.model';
import { DataStoreService } from '../../services/data-store/data-store.service';
import { ItemService } from '../../services/item/item.service';

@Component({
  selector: 'app-item',
  imports: [ NgbCarouselModule ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

	@ViewChild('carousel', { static: true }) carousel!: NgbCarousel;
  item!: Item | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dataStoreService: DataStoreService,
    private readonly itemService: ItemService
  ) {

  }

  ngOnInit(): void {
    let id: string | null = this.route.snapshot.paramMap.get('id');
    this.item = this.dataStoreService.getItem(parseInt(id ?? '0'));
  }

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}
}
