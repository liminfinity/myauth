import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/models";
import { LoginReq, SignUpReq } from "../../types/request";
import { AuthService } from "../../services/AuthService";
import { isError, isPending, isFulfilled } from "../../utils/predicates";
import { getErrorMessage } from "../../utils/format";

interface authState {
    user: IUser | null,
    isLoading: boolean,
    errors: string[],
}
const initialState: authState = {
    user: null,
    isLoading: false,
    errors: [],
}

export const loginAction = createAsyncThunk<IUser, LoginReq, {rejectValue: string}>(
    'auth/login',
    async function (loginReq, {rejectWithValue}) {
        try {
            const user = await AuthService.login(loginReq);
            return user;
        } catch (err) {
            const message = getErrorMessage(err as Error)
            throw rejectWithValue(message)
        }
    }
)
export const logoutAction = createAsyncThunk<undefined, undefined, {rejectValue: string}>(
    'auth/logout',
    async function (_, {rejectWithValue}) {
        try {
            await AuthService.logout();
        } catch (err) {
            const message = getErrorMessage(err as Error)
            throw rejectWithValue(message)
        }
    }
)


export const signUpAction = createAsyncThunk<string, SignUpReq, {rejectValue: string}>(
    'auth/signup',
    async function (signupReq, {rejectWithValue}) {
        try {
            const email = await AuthService.signUp(signupReq);
            return email;
        } catch (err) {
            const message = getErrorMessage(err as Error)
            throw rejectWithValue(message)
        }
    }
)
export const refreshAction = createAsyncThunk<IUser, undefined, {rejectValue: string}>(
    'auth/refresh',
    async function (_, {rejectWithValue}) {
        try {
            const user = await AuthService.refresh();
            return user;
        } catch (err) {
            const message = getErrorMessage(err as Error)
            throw rejectWithValue(message)
        }
    }
)
export const deleteAccountAction = createAsyncThunk<boolean, string, {rejectValue: string}>(
    'auth/deleteAccount',
    async function (userId, {rejectWithValue}) {
        try {
            const deleted = await AuthService.deleteAccount(userId);
            return deleted;
        } catch (err) {
            const message = getErrorMessage(err as Error)
            throw rejectWithValue(message)
        }
    }
)
export const checkAuthAction = createAsyncThunk<IUser, undefined, {rejectValue: string}>(
    'auth/checkAuth',
    async function (_, {rejectWithValue}) {
        try {
            const user = await AuthService.checkAuth();
            return user;
        } catch (err) {
            const message = getErrorMessage(err as Error)
            throw rejectWithValue(message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.isLoading = false;
            state.errors = [];
            state.user = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        shiftError(state) {
            state.errors.shift();
        },
        pushError(state, action: PayloadAction<string>) {
            state.errors.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        
        builder.addCase(loginAction.fulfilled, (state, action: PayloadAction<IUser>) => {

            state.user = action.payload  
        })
        builder.addCase(logoutAction.fulfilled, (state) => {

            state.user = null;
        })
        builder.addCase(refreshAction.fulfilled, (state, action: PayloadAction<IUser>) => {
            
            state.user = action.payload;
        })
        builder.addCase(checkAuthAction.fulfilled, (state, action: PayloadAction<IUser>) => {

            state.user = action.payload  
        })
        builder.addCase(deleteAccountAction.fulfilled, (state, action: PayloadAction<boolean>) => {
            if (action.payload) {
                state.user = null;
            }
        })
        builder.addMatcher(isFulfilled, (state) => {
            state.isLoading = false;
            state.errors = [];
        })
        builder.addMatcher(isPending, (state) => {
            state.isLoading = true;
        })
        builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errors.push(action.payload);
        })

    },

})
export const {setUser, setLoading, shiftError, pushError} = authSlice.actions
export default authSlice.reducer