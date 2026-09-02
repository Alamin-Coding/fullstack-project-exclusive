import { createSlice } from '@reduxjs/toolkit';

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("userInfo");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const initialState = {
  user: getStoredUser(),
}

export const authSlices = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload 
      localStorage.setItem("userInfo", JSON.stringify(action.payload))

    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem("userInfo", JSON.stringify(state.user))
    },
    logout: (state) => {
      console.log("Logout")
      state.user = null
      localStorage.removeItem("userInfo")
    }
  },
})

export const { login, logout, updateUser } = authSlices.actions;
export default authSlices.reducer;
