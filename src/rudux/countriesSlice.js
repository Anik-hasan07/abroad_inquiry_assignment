import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
  countries: [],
  loading: false,
  error: null,
};


export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  try {
    const response = await fetch('http://dev.abroadinquiry.com:5001/countries?page=1&name=a');
    console.log("----------",response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data?.data;
  } catch (error) {
    throw error;
  }
});


const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default countriesSlice.reducer;

