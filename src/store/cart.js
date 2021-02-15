let initialState = {
  items: [],
  total: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  let { type, payload } = action;
  let items = state.items;
  let totalCount = state.total;
  switch (type) {
    case 'ADD':
      if (!state.items) {
        items.push({ name: payload, quantity: 1 });
        items++;
        return { ...state, items, total: totalCount };
      }
      let cartItem = items.reduce((cumm, item) => {
        if (item.name === payload) {
          item.quantity++;
          totalCount++;
          cumm = true;
          return cumm;
        }
        return cumm;
      }, false);
      if (!cartItem) {
        items.push({ name: payload, quantity: 1 });
        totalCount++;
      }
      return { ...state, items, total: totalCount };

    case 'REMOVE':
      let total = state.total - 1;
      let cartItems = state.items.reduce((cumm, item) => {
        if (item.name === payload) {
          item.quantity--;
          if (item.quantity > 0) {
            cumm.push(item);
          }
          return cumm;
        }
        cumm.push(item);
        return cumm;
      }, []);
      return { ...state, items: cartItems, total};

    case 'RESET':
      state = initialState;
      return { ...state, items: [], total: 0 };

    default:
      return state;
  }
};

export const add = (item) => {
  return {
    type: 'ADD',
    payload: item,
  };
};

export const remove = (item) => {
  return {
    type: 'REMOVE',
    payload: item,
  };
};

export const reset = () => {
  return {
    type: 'RESET',
    payload: '',
  };
};
