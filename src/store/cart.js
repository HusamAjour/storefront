let initialState = {
  items: [],
  total: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  let { type, payload } = action;
  let getCartItems
  let totalCount
  console.log('Inide Cart reducer');

  switch (type) {
    case 'ADD':
      getCartItems = state.items;
      totalCount = state.total;
      console.log('payload add to cart reducer', payload);
      console.log('Inide add to Cart reducer');
      if (!state.items) {
        getCartItems.push({ product: payload, quantity: 1 });
        totalCount++;
        return { ...state, items: getCartItems, total: totalCount };
      }
      let cartItem = getCartItems.reduce((cumm, item) => {
        if (item.product.name === payload.name) {
          item.quantity++;
          totalCount++;
          cumm = true;
          return cumm;
        }
        return cumm;
      }, false);
      if (!cartItem) {
        getCartItems.push({ product: payload, quantity: 1 });
        totalCount++;
      }
      console.log('state before send', { ...getCartItems, items: cartItem, total: totalCount });
      return { ...state, items: getCartItems, total: totalCount };

    case 'REMOVE':
      getCartItems = state.items;
      totalCount = state.total;
      console.log('payload iniside cart', payload)
      totalCount = totalCount - 1;
      let cartItems = getCartItems.reduce((cumm, item) => {
        console.log('reduce count by 1',item.product);
        if (item.product.name === payload.name) {
          item.quantity--;
          if (item.quantity > 0) {
            cumm.push(item);
          }
          return cumm;
        }
        cumm.push(item);
        return cumm;
      }, []);
      return { ...getCartItems, items: cartItems, total: totalCount};

    case 'RESET':
      state = initialState;
      return { ...state, items: [], total: 0 };

    default:
      return state;
  }
};

// export const add = (item) => {
//   return {
//     type: 'ADD',
//     payload: item,
//   };
// };

// export const remove = (item) => {
//   return {
//     type: 'REMOVE',
//     payload: item,
//   };
// };

// export const reset = () => {
//   return {
//     type: 'RESET',
//     payload: '',
//   };
// };
