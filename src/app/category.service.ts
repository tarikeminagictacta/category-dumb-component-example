import { Injectable } from '@angular/core';
import { Category } from './category.model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [
    {
      id: 1,
      categoryName: 'nesto'
    },
    {
      id: 2,
      categoryName: 'nesto'
    },
    {
      id: 3,
      categoryName: 'nesto'
    },
    {
      id: 4,
      categoryName: 'nesto'
    },
    {
      id: 5,
      categoryName: 'nesto'
    }
  ];

  getByTerm(term: string): Observable<Category[]> {
    if (term.length < 2) {
      return of([]);
    }
    return this.backendData(term);
  }

  addCategory(categoryName: string): Observable<Category> {
    const newCategory: Category = { id: this.categories.length, categoryName };
    this.categories.push(newCategory);
    return of(newCategory);
  }

  private backendData(term: string): Observable<Category[]> {
    return of(
      this.categories.filter(
        x =>
          x.categoryName.toLowerCase().indexOf(
            term
              .toLowerCase()
              .trim()
              .replace(/\s+/g, ' ')
          ) !== -1
      )
    );
  }
}
