import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0,
  },
  reducers: {
    add(state, action) {
      console.log(action.payload);
      let found = false;
      state.items.map((item) => {
        if (item.name === action.payload.name) {
          item.count++;
          found = true;
        }
        return item;
      });
      if (found === false) {
        state.items.push({
          name: action.payload.name,
          count: 1,
          product: action.payload,
        });
      }
      state.totalItems++;
      return state;
    },
    remove(state, action) {
      let found = false;
      let updatedItems = state.items.reduce((cumm, item) => {
        if (item.name === action.payload.name) {
          item.count--;
          found = true;
        }
        if (item.count > 0) {
          cumm.push(item);
        }
        return cumm;
      }, []);
      state.items = updatedItems;
      if(found){
        if(state.totalItems>0){
          state.totalItems--;
        }
      }
     
      return state;
    },
  },
});
export const { add, remove } = dataSlice.actions;
export default dataSlice.reducer;
