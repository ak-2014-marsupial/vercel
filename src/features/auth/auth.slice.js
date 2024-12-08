import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {authService} from "../../services/authService";
import {appConstants} from "../../constants/app.constants";

const initialState = {
    registerError: null,
    loginError: null,
    currentUser: JSON.parse(localStorage.getItem(appConstants.localStorageKeyCurrentUser)) || null,
    isAdditionallyStoredInLocalStorage: Boolean(localStorage.getItem(appConstants.localStorageKeyIsSessionSave))
};

const register = createAsyncThunk(
    'authSlice/register',
    async ({user}, {rejectWithValue}) => {
        try {
            return await authService.register(user)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const signInWithGoogle = createAsyncThunk(
    'authSlice/signInWithGoogle',
    async ({credentialResponse}, {rejectWithValue}) => {
        try {
            return await authService.registerWithGoogle(credentialResponse);
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
    reducers: {
        logOut: (state) => {
            state.currentUser = null;
            localStorage.removeItem(appConstants.accessTokenKey)
            localStorage.removeItem(appConstants.refreshTokenKey)
        },

        setAdditionallyStoredInLocalStorage: (state, action) => {
            // state.isAdditionallyStoredInLocalStorage = !Boolean(state.isAdditionallyStoredInLocalStorage);
            //toggles the boolean value of isAdditionallyStoredInLocalStorage.
            console.log("press ChekBox");
            state.isAdditionallyStoredInLocalStorage ^= true;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
            .addCase(signInWithGoogle.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.registerError = action.payload?.message || 'Username already exist'
            })
            .addCase(login.rejected, state => {
                state.loginError = 'Wrong username or password'
            })
            .addCase(me.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
            .addMatcher(isFulfilled(register, login, signInWithGoogle), state => {
                state.registerError = null
                state.loginError = null
            })

})

const {reducer: authReducer, actions} = authSlice;

const authActions = {
    ...actions,
    register,
    login,
    signInWithGoogle,
    me
}

export {
    authActions,
    authReducer
}