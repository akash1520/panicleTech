import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    dob: string;
    image: string;
    bio: string;
    address: string;
    isActive: boolean;
    country: string;
    createdBy:string;
}

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: [],
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        editUser: (state, action: PayloadAction<User>) => {
            const { id } = action.payload;
            const userIndex = state.users.findIndex((user) => user.id === id);
            if (userIndex !== -1) {
              state.users[userIndex] = action.payload;
            }
          },
    },
});

export const { addUser,editUser } = userSlice.actions;

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}



const persistedReducer = persistReducer(persistConfig, userSlice.reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export { store, persistor };
