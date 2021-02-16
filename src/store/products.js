let initialState = {
  categories: [],
  products: [],
  activeCategory: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET':
      console.log('payload >>>> ', payload);
      // I can play around with the response of the API
      // remove stuff/ add stuff
      if (state.activeCategory === '') {
        return {
          ...state,
          categories: payload.categories,
          products: payload.products,
          activeCategory: payload.categories[0].name,
        };
      } else {
        return {
          ...state,
          categories: payload.categories,
          products: payload.products,
        };
      }
    case 'ADD':
    case 'REMOVE':
      let prods = state.products;
      console.log('PUT payload >>>> ', payload);
      // I can play around with the response of the API
      // remove stuff/ add stuff
      let newProds  = prods.reduce((cumm, item)=>{
        if(payload.name === item.name){
          item.inStock = payload.inStock;
          cumm.push(item);
          return cumm;
        }else{
          cumm.push(item);
          return cumm;
        }
       
      },[]);

      console.log('Copy of the state', { ...state, products: newProds });
      return { ...state, products: newProds };

    case 'ActiveCategory':
      console.log('payload >>>> ', payload);
      return { ...state, activeCategory: payload };

    default:
      return state;
  }
};
