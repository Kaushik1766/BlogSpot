import { createSlice } from '@reduxjs/toolkit'
export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        username: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload;
        }
    }

})
export const { setUser } = loginSlice.actions;
export const useDispatch = state => state.login.username;
export default loginSlice.reducer;