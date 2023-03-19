type CategoriesType = ['Personal' | 'Business'];

export class Categories {
  private _categories: CategoriesType;

  public get categories(): CategoriesType {
    return this._categories;
  }

  private set categories(value: CategoriesType) {
    this._categories = value;
  }

  private validateCategories(categories: Array<string>) {
    return categories.length <= 0 && this._categories.length <= 0;
  }

  constructor(categories: CategoriesType) {
    const isCategoriesValid = this.validateCategories(categories);

    if (!isCategoriesValid) {
      throw new Error('Must be at least one category');
    }
    this.categories = categories;
  }
}
