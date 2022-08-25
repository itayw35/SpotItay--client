import React, { useContext, useEffect, useRef, useState } from "react";
import Playlist from "./Playlist";
import axios from "axios";
import { PlaylistContext } from "../context/context";
import "./Playlists.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
export default function Playlists(props) {
  const [isCreating, setIsCreating] = useState(false);
  const [rotate, setRotate] = useState(false);
  const { isLogged, baseURL, getPlayLists, list } = useContext(PlaylistContext);
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
        getPlayLists();
      })
      .catch((err) => console.log(err));
  };
  const removePlaylist = function (e, playlist) {
    e.stopPropagation();
    axios
      .put(
        `${baseURL}/playlist/remove-playlist`,
        { name: playlist },
        { headers: { authorization: "bearer " + localStorage.token } }
      )
      .then((res) => {
        console.log(res.data);
        getPlayLists();
      })
      .catch((err) => console.log(err));
  };
  const sharePlaylist = function (playlist, friend) {
    console.log(friend);
    axios
      .post(
        `${baseURL}/playlist/share-playlist`,
        {
          playlist: playlist,
          email: friend,
        },
        { headers: { authorization: "bearer " + localStorage.token } }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (isLogged) {
      getPlayLists();
    }
  }, []);

  return (
    <div className={props.className} id={props.id}>
      {" "}
      {list.length > 0
        ? list.map((v) => {
            return (
              <>
                <Playlist
                  func={(e) => props.func(e, v)}
                  playlist={v.name}
                  remove={(e) => {
                    removePlaylist(e, v.name);
                  }}
                  share={(friend) => {
                    sharePlaylist(v.name, friend);
                  }}
                />
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
            <div className="buttons-flex">
              <button
                className="ok-button"
                onClick={() => {
                  makePlaylist();
                  rotateIcon();
                }}
              >
                ok
              </button>
              <button
                className="ok-button"
                onClick={() => setIsCreating(false)}
              >
                cancel
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
