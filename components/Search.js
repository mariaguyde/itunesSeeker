import React from "react";
import {Image, StyleSheet, Text, TextInput,} from "react-native";
import { TouchableOpacity, View, FlatList} from "react-native";
import { useEffect, useState } from "react/cjs/react.development";
import Popup from 'reactjs-popup';
import {addSongToList} from './searchSlice';
import {useDispatch} from "react-redux";

export const ListFavoriteMusic =[];
const itunes_request = async (keyword) => {
    if (!keyword == ""){
        const response = await fetch(`https://itunes.apple.com/search?term=${keyword}`);
        const json = await response.json();
        //console.log(json.results);
        return json.results.filter((item) => item.trackId && item.trackName).map(song_infos);
    }
};


const Search = ({ }) => {
    const [input, setInput] = useState("");
    const [listResults, setListResults] = useState([]);
    const dispatch = useDispatch();


    function addToFavoriteMusic(song) {
        dispatch(addSongToList(song));
        //console.log(ListFavoriteMusic);
    }
    const get_results = () => {
        itunes_request(input).then((result) => {
            setListResults(result);
        });
    };
    useEffect(() => {
        const timeout = setTimeout(get_results, 700);
        return () => {
            clearTimeout(timeout);
        };
    }, [input]);

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Nom de la musique ou de l' artiste"
            />
            <View style={{ flex: 1 , marginTop:"20px"}}>
                    <FlatList
                        data={listResults}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ margin:"10px"}}>
                                <div style={song} class="song">
                                    <Image style={{ width: 150, height: 150}} source={{uri: item.image,}}/>
                                    <div style={sideContainer}>
                                        <div style={{display:"grid", marginBottom: "10px"}}>
                                            <Text style={{fontWeight:"bold", fontSize:"20px"}}>{item.song}</Text>
                                            <Text>{item.artist}</Text>
                                        </div>

                                        <div>
                                            <button  style={{backgroundColor: "#11570f", width: "fit-content", border: "none", color: "white", padding: "10px 19px", marginRight:"10px", borderRadius:"10px"}} onClick={() => addToFavoriteMusic(item)}>Ajouter à ma liste</button>
                                            <span>
                                              <Popup trigger={<button style={{backgroundColor: "#11570f",border: "none", color: "white", padding: "10px 19px", width: "fit-content",marginRight:"10px",borderRadius:"10px"}}  className="button">Voir les détails de ce film</button>} modal nested>
                                                {close => (
                                                    <div style={popup} className="modal">
                                                        <button className="close" onClick={close}>
                                                            &times;
                                                        </button>
                                                        <div className="header" style={{fontWeight: "bold", marginBottom:"10px", marginTop:"10px", fontSize:"20px"}}> {item.song} </div>
                                                        <Image style={{ width: 190, height: 190, marginTop:"10px"}} source={{uri: item.image,}}/>
                                                        <div className="content" style={{display: "grid", marginTop: "30px"}}>
                                                            <span> Artiste: {item.artist} </span>
                                                            <span> Genre : {item.genre} </span>
                                                            <span> Date de sortie : {item.release} </span>
                                                        </div>
                                                    </div>
                                                )}
                                              </Popup>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
            </View>
        </View>
    );
};

const popup = {
    backgroundColor : "white",
    padding : "20px",
    width:"200px"
}

const song = {
    display : "flex"
}

const sideContainer = {
    marginLeft: "10px"
}
const song_infos = (song) => {
    let releaseDate = song.releaseDate.substring(0, 10);
    return {
        id: song.trackId.toString(),
        song: song.trackName,
        artist: song.artistName,
        image: song.artworkUrl100,
        genre: song.primaryGenreName,
        release: releaseDate,
        tracK_itunesURL : song.trackViewUrl};
};

export default Search;
