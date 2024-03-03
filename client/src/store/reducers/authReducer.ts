import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/models";
import { LoginReq, SignUpReq } from "../../types/request";
import { AuthService } from "../../services/AuthService";
import { isError, isPending, isFulfilled } from "../../utils/predicates";

interface authState {
    user: IUser | null,
    isLoading: boolean,
    errors: string[],
    activatedEmail: string | undefined
}
const initialState: authState = {
    user: null,
    isLoading: false,
    errors: [],
    activatedEmail: undefined
}

export const loginAction = createAsyncThunk<IUser, LoginReq, {rejectValue: string}>(
    'auth/login',
    async function (loginReq, {rejectWithValue}) {
        try {
            const user = await AuthService.login(loginReq);
            return user;
        } catch (err) {
            rejectWithValue(`Login error`)
        }
    }
)
export const logoutAction = createAsyncThunk<undefined, undefined, {rejectValue: string}>(
    'auth/login',
    async function (_, {rejectWithValue}) {
        try {
            await AuthService.logout();
        } catch (err) {
            rejectWithValue(err.message)
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
            rejectWithValue(err.message)
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
            rejectWithValue(err.message)
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(isFulfilled, (state) => {
            state.isLoading = false;
            state.errors = [];
            state.activatedEmail = undefined;
        })
        builder.addCase(signUpAction.fulfilled, (state, action: PayloadAction<string>) => {
            
            state.activatedEmail = action.payload;
        })
        
        builder.addCase(loginAction.fulfilled, (state, action: PayloadAction<IUser>) => {

            state.user = action.payload  
        })
        builder.addCase(logoutAction.fulfilled, (state) => {

            state.user = null;
        })
        builder.addCase(refreshAction.fulfilled, (state, action: PayloadAction<IUser>) => {
            
            state.user = action.payload;
        })
        builder.addMatcher(isPending, (state) => {
            state.isLoading = true;
            state.errors = [];
            state.activatedEmail = undefined;
        })
        builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errors.push(action.payload);
            state.activatedEmail = undefined;
        })

    },

})

export default authSlice.reducer