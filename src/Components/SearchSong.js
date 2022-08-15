import axios from "axios";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { PlaylistContext } from "../context/context";
import Playlist from "./Playlist";
import "./SearchSong.css";
export default function SearchSong(props) {
  const [showPlaylists, setShowPlaylists] = useState(false);
  const { setPlaylist, playlist, num, currentPlaylist, baseURL } =
    useContext(PlaylistContext);
  const [list, setList] = useState([]);
  const [onePlaylist, setOnePlaylist] = useState([]);
  const addSong = (v) => {
    axios
      .put(
        `${baseURL}/playlist/add-song`,
        {
          playlist: v.name,
          song: { name: props.title, id: props.id },
        },
        {
          headers: { authorization: "bearer " + localStorage.token },
        }
      )
      .then((res) => {
        console.log(res);
        getSongs(v.name);
      });
  };
  const getSongs = (playlist) => {
    playlist
      ? axios
          .get(`${baseURL}/playlist/get-playlists/${playlist}`, {
            headers: { authorization: "bearer " + localStorage.token },
          })
          .then((res) => {
            setOnePlaylist(res.data);
            console.log(res.data);
          })
      : axios
          .get(`${baseURL}/playlist/get-playlists`, {
            headers: { authorization: "bearer " + localStorage.token },
          })
          .then((res) => setList(res.data));
  };
  useEffect(() => {
    if (onePlaylist.length === 1) {
      const existPlaylist = playlist.findIndex((val) => {
        return val.name === onePlaylist[0].name;
      });
      // if (existPlaylist !== -1) {
      setPlaylist([
        ...playlist.slice(0, existPlaylist),
        { name: onePlaylist[0].name, songs: onePlaylist[0].songs },
        ...playlist.slice(existPlaylist + 1),
      ]);
      // } else {
      //   setPlaylist([
      //     ...playlist,
      //     { name: onePlaylist[0].name, songs: onePlaylist[0].songs },
      //   ]);
      // }
    }
  }, [onePlaylist]);
  useEffect(() => {
    if (list.length > 0) {
      const updatedPlaylist = list.findIndex((v) => {
        return v.name === currentPlaylist;
      });
      const existPlaylist = playlist.findIndex((val) => {
        return val.name === currentPlaylist;
      });
      setPlaylist([
        ...playlist.slice(0, existPlaylist),
        {
          name: list[updatedPlaylist]?.name,
          songs: list[updatedPlaylist]?.songs,
        },
        ...playlist.slice(existPlaylist + 1),
      ]);
    }
  }, [list]);

  useEffect(() => getSongs(), [num]);
  return (
    <div className="search-song" key={props.id}>
      <div>{props.title}</div>
      <br />
      <button
        className="add-to-playlist-button"
        onClick={() => {
          setShowPlaylists(true);
          // props.func(v);
        }}
      >
        Add to PlayList
      </button>
      {showPlaylists ? (
        <>
          {list.length > 0
            ? list.map((v) => {
                return (
                  <>
                    <Playlist func={() => addSong(v)} playlist={v.name} />
                  </>
                );
              })
            : null}
        </>
      ) : null}
    </div>
  );
}
