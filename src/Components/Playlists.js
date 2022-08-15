import React, { useContext, useEffect, useRef, useState } from "react";
import Playlist from "./Playlist";
import axios from "axios";
import { PlaylistContext } from "../context/context";
import "./Playlists.css";
export default function Playlists(props) {
  const [isCreating, setIsCreating] = useState(false);
  const [list, setList] = useState([]);
  const { setPlaylist, playlist, setCurrentPlaylist, isLogged, baseURL } =
    useContext(PlaylistContext);
  const playlistName = useRef();
  const makePlaylist = () => {
    setIsCreating(false);
    axios
      .post(
        `${baseURL}/playlist/make-playlist`,
        {
          name: playlistName.current.value,
        },
        { headers: { authorization: "bearer " + localStorage.token } }
      )
      .then((res) => {
        console.log(res.data);
        getPlayLIsts();
      })
      .catch((err) => console.log(err));
  };
  const getPlayLIsts = function () {
    axios
      .get(`${baseURL}/playlist/get-playlists`, {
        headers: { authorization: "bearer " + localStorage.token },
      })
      .then((res) => setList(res.data));
  };

  useEffect(() => {
    if (isLogged) {
      getPlayLIsts();
    }
  }, []);
  const updatePlaylist = (v) => {
    console.log(playlist);
    setCurrentPlaylist(v.name);
    const existPlaylist = playlist.findIndex((val) => {
      return val.name === v.name;
    });
    if (existPlaylist !== -1) {
      if (playlist[existPlaylist].songs.length <= v.songs.length) {
        setPlaylist([
          ...playlist.slice(0, existPlaylist),
          { name: v.name, songs: v.songs },
          ...playlist.slice(existPlaylist + 1),
        ]);
      }
    } else {
      setPlaylist([...playlist, { name: v.name, songs: v.songs }]);
    }
  };
  return (
    <div className={props.className} id={props.id}>
      {" "}
      {list.length > 0
        ? list.map((v) => {
            return (
              <>
                <Playlist func={() => updatePlaylist(v)} playlist={v.name} />
              </>
            );
          })
        : null}
      <div className="create-playlist">
        <button onClick={() => setIsCreating(true)}>
          + Create New Playlist
        </button>
        {isCreating ? (
          <>
            <input
              className="new-playlist-name"
              ref={playlistName}
              placeholder="Enter Playlist Name"
            ></input>
            <button className="ok-button" onClick={makePlaylist}>
              ok
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
