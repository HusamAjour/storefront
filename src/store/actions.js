import axios from 'axios';

// .env
const api = 'https://husam278-api-server.herokuapp.com/api';

// action creator function returns an object
// I am returning a function that has a call for superagent API
export const getRemoteData = () => async (dispatch) => {
  console.log('inside dispatch of getRemoteData GET!!!! ');
  let categories = await axios.get(`${api}/categories`);
  let products = await axios.get(`${api}/products`);
  return dispatch(
    getAction({
      categories: categories.data.result,
      products: products.data.result,
      activeCategory: '',
    })
  );
};

export const changeActiveCategory = (data) => (dispatch) => {
  console.log('inside changeActiveCategory!!!!!');
  return dispatch(activeCategory(data));
};

export const updateAndGetData = (actionType, data) => async (dispatch) => {
  console.log('inside dispatch of updateAndGetData PUT!!!! ');
  console.log('data', data);
  let newData;
  if (actionType === 'ADD') {
    let quantity = data.inStock - 1;
    newData = { ...data, inStock: quantity };
  } else if (actionType === 'REMOVE') {
    let quantity = data.inStock + 1;
    newData = { ...data, inStock: quantity };
  }

  console.log('newData', data);

  let products = await axios({
    method: 'PUT',
    url: `${api}/products/${newData._id}`,
    data: newData,
  });
//   let products = await axios.get(`${api}/products`);
  console.log(products);
  return dispatch(updateAction(actionType, products.data));
};

// action creator function.
const getAction = (payload) => {
  console.log('in getAction@@@@@@@@@!!!!');
  return {
    type: 'GET',
    payload: payload,
  };
};

const updateAction = (type, payload) => {
  console.log('in updateAction@@@@@@@@@!!!!');
  return {
    type: type,
    payload: payload,
  };
};

const activeCategory = (name) => {
  console.log('in increment action name=', name);
  return {
    type: 'ActiveCategory',
    payload: name,
  };
};

// export const add = (item) => (dispatch) => {
//   return dispatch({
//     type: 'ADD',
//     payload: item,
//   });
// };
// export const remove = (item) => (dispatch) => {
//   return dispatch({
//     type: 'REMOVE',
//     payload: item,
//   });
// };

// export const reset = () => {
//   return {
//     type: 'RESET',
//     payload: '',
//   };
// };
