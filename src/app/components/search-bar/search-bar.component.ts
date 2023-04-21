import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {


  constructor(private publicationsService: PublicationsService){}

  private debounceTimer?: any


  @Output() searchQueryChanged = new EventEmitter<string>();

  SearchQuery!: string;

  onQueryChange(value: string) {
    this.SearchQuery = value;
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
        this.searchQueryChanged.emit(this.SearchQuery);
    }, 350);
  }


}
