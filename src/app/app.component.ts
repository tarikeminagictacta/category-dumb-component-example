import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';
import { Category } from './category.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  searchFunction: (term: string) => Observable<Category[]>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.searchFunction = (term: string) => this.categoryService.getByTerm(term);
  }

  dodajKategoriju(newCategory: string) {
    this.categoryService.addCategory(newCategory).subscribe();
  }
}
