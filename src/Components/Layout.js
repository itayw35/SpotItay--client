// import Player from "./Player";
import Header from "./Header";
import Search from "./Search";
import SongList from "./SongList";
import { useState } from "react";
import Player from "./Player";
import Player2 from "./Player2";
import { PlaylistContext } from "../context/context";
import Login from "./Login";
import Playlists from "./Playlists";
import "./Layout.css";
import axios from "axios";
export default function Layout() {
  const [getSong, setGetSong] = useState("");
  const [songAdded, setSongAdded] = useState("");
  const [binge, setBinge] = useState();
  const [shuffle, setShuffle] = useState([]);
  const [counter, setCounter] = useState(0);
  const [playlist, setPlaylist] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [isLogged, setIsLogged] = useState(localStorage.token);
  const [num, setNum] = useState(0);
  const [list, setList] = useState([]);
  const baseURL = "https://spotitay.herokuapp.com";
  const loadPlaylist = (e, v) => {
    setCurrentPlaylist(v.name);
  };
  const getPlayLists = function () {
    axios
      .get(`${baseURL}/playlist/get-playlists`, {
        headers: { authorization: "bearer " + localStorage.token },
      })
      .then((res) => {
        setList(res.data);
        const playlists = res.data;
        for (let i in playlists) {
          playlist[i] = {
            name: playlists[i].name,
            songs: playlists[i].songs,
          };
        }
      });
  };

  return (
    <>
      <PlaylistContext.Provider
        value={{
          playlist,
          setPlaylist,
          currentPlaylist,
          setCurrentPlaylist,
          isLogged,
          num,
          setNum,
          baseURL,
          getPlayLists,
          list,
        }}
      >
        <Header
          setCounter={setCounter}
          counter={counter}
          setIsLogged={setIsLogged}
        />
        {isLogged ? (
          <>
            <div className="main-flex">
              <div className="song-list-central-flex">
                <SongList
                  songadd={songAdded}
                  setBinge={setBinge}
                  choose={setGetSong}
                  setShuffle={setShuffle}
                />
                <div className="central-flex">
                  <Search func={setSongAdded} />
                  {getSong || binge ? (
                    <Player
                      className="player"
                      id={getSong}
                      binge={binge}
                      shuffle={shuffle}
                    />
                  ) : null}
                </div>
              </div>
              <Playlists
                className="playlists"
                id={counter % 2 === 1 ? "open-playlists" : ""}
                func={loadPlaylist}
              />
            </div>
          </>
        ) : (
          <Login setIsLogged={setIsLogged} />
        )}
      </PlaylistContext.Provider>
    </>
  );
}
