import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    password: '',
    id: '',
    isAdmin: 0,
    idCart: ''
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name = '', email = '', address = '', phone = '', avatar = '', id = '', password = '', isAdmin = 0 , idCart = '' } = action.payload
            state.name = name ? name : state.name;
            state.email = email ? email : state.email;
            state.address = address ? address : state.address;
            state.phone = phone ? phone : state.phone;
            state.avatar = avatar ? avatar : state.avatar;
            state.id = id ? id : state.id;
            state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
            state.idCart = idCart ? idCart : state.idCart;
            state.password = password ? password : state.password;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state.id = '';
            state.isAdmin = 0;
            state.password = "";
            state.idCart = "";
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer