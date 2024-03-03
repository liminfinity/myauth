import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/models";
import { isError, isPending, isFulfilled } from "../../utils/predicates";
import { UserService } from "../../services/UserService";

interface usersState {
    users: IUser[],
    isLoading: boolean,
    errors: string[]
}
const initialState: usersState = {
    users: [],
    isLoading: false,
    errors: []
}
export const getUsersAction = createAsyncThunk<IUser[], undefined, {rejectValue: string}>(
    'users/getUsers',
    async function (_, {rejectWithValue}) {
        try {
            const users = await UserService.getUsers();
            return users;
        } catch (err) {
            rejectWithValue(err.message)
        }
        
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addMatcher(isFulfilled, (state) => {
            state.isLoading = false;
            state.errors = [];
        })
        builder.addCase(getUsersAction.fulfilled, (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
        })
        builder.addMatcher(isPending, (state) => {
            state.isLoading = true;
            state.errors = [];
        })
        builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errors.push(action.payload);
        })
    },
})

export default usersSlice.reducer