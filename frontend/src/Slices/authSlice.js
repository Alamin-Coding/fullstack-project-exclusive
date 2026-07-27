import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem("userInfo") || null,
}

export const authSlices = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload 
      localStorage.setItem("userInfo", JSON.stringify(action.payload))

    },
    logout: (state) => {
      state.user = null
    }
  },
})

export const { login, logout } = authSlices.actions;
export default authSlices.reducer;