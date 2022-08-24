import React, { useContext, useEffect, useRef, useState } from "react";
import Playlist from "./Playlist";
import axios from "axios";
import { PlaylistContext } from "../context/context";
import "./Playlists.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
export default function Playlists(props) {
  const [isCreating, setIsCreating] = useState(false);
  // const [list, setList] = useState([]);
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
  // const getPlayLists = function () {
  //   axios
  //     .get(`${baseURL}/playlist/get-playlists`, {
  //       headers: { authorization: "bearer " + localStorage.token },
  //     })
  //     .then((res) => {
  //       setList(res.data);
  //       const playlists = res.data;
  //       for (let i in playlists) {
  //         playlist[i] = {
  //           name: playlists[i].name,
  //           songs: playlists[i].songs,
  //         };
  //       }
  //     });
  // };
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
                <Playlist func={() => props.func(v)} playlist={v.name} />
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
