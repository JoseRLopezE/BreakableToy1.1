import { INITIAL_CATEGORIES } from './initialData';

describe('initialData', () => {
  it('contains the expected categories', () => {
    expect(INITIAL_CATEGORIES).toEqual(
      expect.arrayContaining([
        'Electronics',
        'Food',
        'Clothing',
        'Books',
        'Tools',
        'Furniture',
        'Appliances',
        'Footwear',
        'Kitchenware',
        'Accessories',
      ])
    );
  });
});
