import { FlatList, Image, Linking, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import {ListFavoriteMusic} from "./Search";
import React from "react";
import Popup from "reactjs-popup";
import {searchSliceSelector} from "./searchSlice";
import { useSelector } from "react-redux";

function note(item) {
    let note = document.getElementById("note").value;
    item.note = note;
    //console.log(item);
}

const Item_song = ({ title }) => (
    <View>
        <div className="song" style={{display:"flex", marginBottom:"20px"}}>
            <Image style={{width: 150, height: 150}} source={{uri: title.image,}}/>
            <div style={{marginLeft:"10px"}}>
                <div style={{display: "grid", marginBottom: "10px"}}>
                    <Text style={{fontWeight:"bold", fontSize:"20px"}}>{title.song}</Text>
                    <Text>{title.artist}</Text>
                    <Text>Note : {title.note}</Text>
                    <Popup trigger={<button style={{ marginTop: "10px",borderRadius:"10px", width: "fit-content",backgroundColor: "#11570f",border: "none", color: "white", padding: "10px 19px",}}  className="button">Noter la chanson</button>} modal nested>
                        {close => (
                            <div className="modal" style={{backgroundColor:"white", padding:"15px"}}>
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <label htmlFor="note">Note :</label>
                                <input type="number" id="note" name="note" min="0" max="10"/>
                                <button style={{ marginTop: "10px",borderRadius:"10px", width: "fit-content",backgroundColor: "#11570f",border: "none", color: "white", padding: "10px 19px",}}  onClick={() => note(title)}>Valider</button>
                            </div>
                        )}
                    </Popup>
                    <Popup trigger={<button style={{ borderRadius:"10px", marginTop: "10px", width: "fit-content",backgroundColor: "#11570f",border: "none", color: "white", padding: "10px 19px",}}  className="button">Voir les détails</button>} modal nested>
                        {close => (
                            <div className="modal" style={{backgroundColor:"white", padding:"15px", display:"grid"}}>
                                <button className="close" onClick={close} style={{width:"fit-content"}}>
                                    &times;
                                </button>
                                <Text style={{fontWeight:"bold", fontSize:"20px"}}>{title.song}</Text>
                                <Image style={{width: 150, height: 150, marginTop: "10px"}} source={{uri: title.image,}}/>
                                <Text style={{marginTop: "10px"}}>{title.artist}</Text>
                                <Text>{title.release}</Text>
                                <Text>{title.genre}</Text>
                                <button style={{backgroundColor: "#11570f", color:"white", border:"none", marginTop:"9px", padding:"5px", borderRadius:"9px"}} onClick={() => Linking.openURL(title.tracK_itunesURL)}>Écouter la chanson sur Itunes</button>
                            </div>
                        )}
                    </Popup>
                </div>
            </div>
        </div>
    </View>
);

const Results = () => {

    const liste_song = useSelector(searchSliceSelector);
    console.log(liste_song);

    const song_infos = ({ item }) => (
        <Item_song title={item} />
    );

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <div style={{margin:"10px"}}>
                        <Text style={{fontSize:"20px", fontWeight:"bold"}}>Mes musiques préféréés</Text>
                        <div style={{marginTop:"20px"}}>
                            <FlatList
                                data={liste_song}
                                renderItem={song_infos}
                                keyExtractor={(item) => item.id}
                            />
                        </div>
                    </div>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginHorizontal: 10,
        marginTop: "20px"
    },
});

export default Results;
