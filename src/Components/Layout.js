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
export default function Layout() {
  const [getSong, setGetSong] = useState("");
  const [songAdded, setSongAdded] = useState("");
  const [binge, setBinge] = useState();
  const [counter, setCounter] = useState(0);
  const [playlist, setPlaylist] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [isLogged, setIsLogged] = useState(localStorage.token);
  const [num, setNum] = useState(0);
  const baseURL = "https://spotitay.herokuapp.com";
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
                />
                <div className="central-flex">
                  <Search func={setSongAdded} />
                  {getSong || binge ? (
                    <Player
                      className="player"
                      song={getSong.song}
                      singer={getSong.singer}
                      id={getSong.id}
                      binge={binge}
                    />
                  ) : null}
                </div>
              </div>
              <Playlists
                className="playlists"
                id={counter % 2 === 1 ? "open-playlists" : ""}
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
