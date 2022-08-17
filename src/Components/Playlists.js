import React, { useContext, useEffect, useRef, useState } from "react";
import Playlist from "./Playlist";
import axios from "axios";
import { PlaylistContext } from "../context/context";
import "./Playlists.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
export default function Playlists(props) {
  const [isCreating, setIsCreating] = useState(false);
  const [list, setList] = useState([]);
  const [rotate, setRotate] = useState(false);

  const { setPlaylist, playlist, setCurrentPlaylist, isLogged, baseURL } =
    useContext(PlaylistContext);
  const playlistName = useRef();
  const rotateIcon = function () {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 500);
  };
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
  useEffect(() => {
    if (isLogged) {
      getPlayLIsts();
    }
  }, []);
  const loadPlaylist = (v) => {
    console.log(playlist);
    setCurrentPlaylist(v.name);
    // const existPlaylist = playlist.findIndex((val) => {
    //   return val.name === v.name;
    // });
    // if (existPlaylist !== -1) {
    //   if (playlist[existPlaylist].songs.length <= v.songs.length) {
    //     setPlaylist([
    //       ...playlist.slice(0, existPlaylist),
    //       { name: v.name, songs: v.songs },
    //       ...playlist.slice(existPlaylist + 1),
    //     ]);
    //   }
    // } else {
    //   setPlaylist([...playlist, { name: v.name, songs: v.songs }]);
    // }
  };
  return (
    <div className={props.className} id={props.id}>
      {" "}
      {list.length > 0
        ? list.map((v) => {
            return (
              <>
                <Playlist func={() => loadPlaylist(v)} playlist={v.name} />
              </>
            );
          })
        : null}
      <div className="create-playlist">
        <button
          className="create-playlist-button"
          onClick={() => setIsCreating(true)}
        >
          <AiOutlinePlusCircle
            style={rotate ? { rotate: 45 + "deg" } : { rotate: 0 + "deg" }}
          />{" "}
          <span>Create New Playlist</span>
        </button>
        {isCreating ? (
          <>
            <input
              className="new-playlist-name"
              ref={playlistName}
              placeholder="Enter Playlist Name"
              autoFocus
            ></input>
            <button
              className="ok-button"
              onClick={() => {
                makePlaylist();
                rotateIcon();
              }}
            >
              ok
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
