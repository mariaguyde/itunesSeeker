import {combineReducers} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { AsyncStorage } from "@react-native-community/async-storage";
import listSongReducer from "./components/searchSlice";
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const reducers = combineReducers(
    {
        listSong: listSongReducer,
    }
);

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig,
    reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});
