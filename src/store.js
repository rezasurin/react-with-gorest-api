import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authSlice } from './services/authSlice'
import { customerApi } from './services/customer'
import { customerSlice } from './services/customerSlice'

export const store = configureStore({
  reducer: {
    [customerApi.reducerPath]: customerApi.reducer,
    [customerSlice.name]: customerSlice.reducer,
    [authSlice.name]: authSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customerApi.middleware),
})
