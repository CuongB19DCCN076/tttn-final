import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const productSlide = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updateProducts: (state, action) => {
            return state = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateProducts } = productSlide.actions

export default productSlide.reducer