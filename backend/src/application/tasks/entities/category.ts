import { Injectable } from '@nestjs/common';

export const categories = ['Personal', 'Business'] as Array<CategoryType>;

export type CategoryType = 'Personal' | 'Business';

@Injectable()
export class Category {
  private _category: CategoryType;

  public get category() {
    return this._category;
  }

  private set category(value: CategoryType) {
    this._category = value;
  }

  private validateCategory(category: CategoryType): boolean {
    return categories.includes(category);
  }

  constructor(categories: CategoryType) {
    const isCategoriesValid = this.validateCategory(categories);

    if (!isCategoriesValid) {
      throw new Error('Must be a valid category');
    }
    this.category = categories;
  }
}
