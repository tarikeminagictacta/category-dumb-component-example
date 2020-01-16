import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of, interval, Subject } from 'rxjs';
import { Category } from '../category.model';
import { switchMap, debounce, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss']
})
export class CategorySearchComponent {
  searchTerm$: Subject<string> = new Subject<string>();

  @Input()
  searchFunction: (term: string) => Observable<Category[]>;

  @Output()
  addedNewCategory = new EventEmitter<string>();

  searchTerm: string;

  constructor() {
    this.searchTerm$
      .asObservable()
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(x => (this.searchTerm = x)),
        switchMap(x => {
          return this.searchForCategories(x);
        })
      )
      .subscribe(results => {
        this.foundCategories = results;
        this.isLoading = false;
      });
  }

  foundCategories: Category[] = [];
  private _isLoading: boolean;

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(value: boolean) {
    console.log(value);
    this._isLoading = value;
  }

  radiNesto(term: any) {
    this.isLoading = true;
    this.searchTerm$.next(term);
  }

  searchForCategories(term) {
    return this.searchFunction(term);
  }

  get showAddNew() {
    return !this.isLoading && this.searchTerm;
  }

  onAddCategory() {
    this.addedNewCategory.emit(this.searchTerm);
  }
}
