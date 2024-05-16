import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
export const getData = createAsyncThunk(
  'data/getData',
  async (id) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDY5MDIyNzBjYjMwNGFhNWJkYWYwMWZkNzI3MDUyMiIsInN1YiI6IjY0ZjNjZTk1Y2FhNTA4MDBlOTUzMGFlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PZNd5x_CnkqmsIwX3Fj3UzvUqwQItlSohFOFw9b_py0'
      }
    }
    let response = await fetch(`https://api.themoviedb.org/3/tv/${id}`, options)
    let result = await response.json()
    const commentsFetch = await fetch(`/api/${result?.name}`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        accept: 'application/json'
      },
    })
    const comment = await commentsFetch.json()
    return [result, comment];
  }
);
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
export default dataSlice.reducer;