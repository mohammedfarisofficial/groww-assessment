import {createSlice} from '@reduxjs/toolkit';

const stockSlice = createSlice({
  name: 'stock',
  initialState: {
    top_gainers: null,
    top_losers: null,
    selected_company: null,
  },
  reducers: {
    setTopGainerAndLosers: (state, action) => {
      const {top_gainers, top_losers} = action.payload;
      state.top_gainers = top_gainers;
      state.top_losers = top_losers;
    },
    setSelectedCompany: (state, action) => {
      state.selected_company = action.payload;
    },
  },
});

export const {setTopGainerAndLosers, setSelectedCompany} = stockSlice.actions;
export default stockSlice.reducer;
