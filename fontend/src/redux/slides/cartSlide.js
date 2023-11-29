import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart:(state, action) => {
        const data = action.payload
        return [...data]
    },
    addCart: (state, action) => {
      state.push(action.payload); 
    },
    deleteCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id); 
    },
  },
})

export const {updateCart, addCart, deleteCart } = cartSlice.actions

export default cartSlice.reducer