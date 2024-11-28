import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {authService} from "../../services/authService";



const initialState = {
    registerError: null,
    loginError: null,
    currentUser: null
};

const register = createAsyncThunk(
    'authSlice/register',
        async ({user}, {rejectWithValue}) => {
            try {
                await authService.register(user)
            } catch (error) {
                return rejectWithValue(error.response.data)
            }
        }
)

const googleAuth = createAsyncThunk(
    'authSlice/register',
    async (_ , {rejectWithValue}) => {
        try {
            await authService.googleAuth()
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const login = createAsyncThunk(
    'authSlice/login',
        async ({user}, {rejectWithValue}) => {
            try {
                return await authService.login(user);
            } catch (error) {
                return rejectWithValue(error.response.data)
            }
        }
)
const me = createAsyncThunk(
    'authSlice/me',
        async (_, {rejectWithValue}) => {
            try {
                const {data} = await authService.me();
                return data
            } catch (error) {
                return rejectWithValue(error.response.data)
            }
        }
)
const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
            .addCase(me.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
            .addCase(googleAuth.fulfilled, (state, action) => {
                console.log(action.payload);
            })
            .addCase(register.rejected, (state,action) => {
                console.log(action.payload);
                state.registerError = action.payload?.message || 'Username already exist'
            })
            .addCase(login.rejected, (state,action) => {
                state.loginError = action.payload?.message ||'Wrong username or password'
            })

            .addMatcher(isFulfilled(register, login, googleAuth), state => {
                state.registerError = null
                state.loginError = null
            })

})

const {reducer: authReducer, actions} = authSlice;

const authActions = {
    ...actions,
    register,
    googleAuth,
    login,
    me
}

export {
    authActions,
    authReducer
}