let initialState = {
  categories: [
    { name: 'electronics', displayName: 'Elecronics' },
    { name: 'food', displayName: 'Food' },
    { name: 'clothing', displayName: 'Clothing' },
  ],
  products: [
    { name: 'TV', category: 'electronics', price: 699.0, inStock: 5 },
    { name: 'Radio', category: 'electronics', price: 99.0, inStock: 15 },
    { name: 'Shirt', category: 'clothing', price: 9.0, inStock: 25 },
    { name: 'Socks', category: 'clothing', price: 12.0, inStock: 10 },
    { name: 'Apples', category: 'food', price: 0.99, inStock: 500 },
    { name: 'Eggs', category: 'food', price: 1.99, inStock: 12 },
    { name: 'Bread', category: 'food', price: 2.39, inStock: 90 },
  ],
  activeCategory: 'electronics',
};

const reducer = (state = initialState, action) => {
  // console.log('action in reducer ---> ', action);
  // console.log('state ---> ', state);

  let activeCategory = state.activeCategory;
  let { type, payload } = action;

  switch (type) {
    case 'category':
      activeCategory = payload;
      console.log(payload);
      let prods = state.products;
      console.log(prods);
      // let filteredProducts = prods.reduce((cumm, product) => {
      //   if (product.category === activeCategory) {
      //     cumm.push(product);
      //   }
      //   return cumm;
      // }, []);

      // console.log('categoryProducts: ', categoryProducts);
      let categories = state.categories;
      let products = state.products;
      return { categories, products, activeCategory: payload};

    case 'product':
      return state;
    default:
      return state;
  }
};

// actions:
export const product = (name) => {
  console.log('in increment action name=', name);
  return {
    type: 'product',
    payload: name,
  };
};
export const category = (name) => {
  return {
    type: 'category',
    payload: name,
  };
};
export default reducer;
