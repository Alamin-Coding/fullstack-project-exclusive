import { configureStore } from '@reduxjs/toolkit'
import ProductSlices from './Slices/ProductSlices'
import AuthSlices from './Slices/authSlice'

export const store = configureStore({
  reducer: {
    allProduct: ProductSlices,
    auth: AuthSlices,
  },
})
