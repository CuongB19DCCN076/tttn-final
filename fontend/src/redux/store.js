import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/counterSilde'
import userReducer from './slides/userSlide'
import cartReducer from './slides/cartSlide'
import productReducer from './slides/productsSlide'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    cart: cartReducer,
    product: productReducer,
  },
})