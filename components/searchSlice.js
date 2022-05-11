import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name:"listSong",
    initialState: [],
    reducers : {
        // state -> liste des chansons et action -> element que j'ai récupérée depuis la liste qui n'est pas présejt encore dans la liste
        addSongToList: (state, action) => {
            //let get_song = state.map((item)=>item);
            let get_song = state.map((elm) => elm.id).includes(action.payload.id);
            //console.log(get_song);

            if (get_song == true) {
               return state;
            }
            else {
                console.log(action.payload);
                return [ ...state,action.payload];
            }
        }
    }
});

export const {addSongToList}=searchSlice.actions;
export default searchSlice.reducer;
export const searchSliceSelector= (state) => state.listSong;
