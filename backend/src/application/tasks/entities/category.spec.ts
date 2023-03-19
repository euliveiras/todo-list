import { Category, categories } from './category';

describe('Category', () => {
  it('should be able to create a category', () => {
    const element = categories[Math.floor(Math.random() * categories.length)];

    const category = new Category(element);

    expect(category).toBeTruthy();
  });
});
