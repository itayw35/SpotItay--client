import axios from "axios";
import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import { PlaylistContext } from "../context/context";
import Playlists from "./Playlists";
import "./SearchSong.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
export default function SearchSong(props) {
  const [showPlaylists, setShowPlaylists] = useState(false);
  const { setPlaylist, playlist, num, currentPlaylist, baseURL } =
    useContext(PlaylistContext);
  const [list, setList] = useState([]);
  const [onePlaylist, setOnePlaylist] = useState([]);
  const [rotate, setRotate] = useState(false);
  const rotateIcon = function () {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 500);
  };
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
    rotateIcon();
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
      setPlaylist([
        ...playlist.slice(0, existPlaylist),
        { name: onePlaylist[0].name, songs: onePlaylist[0].songs },
        ...playlist.slice(existPlaylist + 1),
      ]);
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

  useEffect(getSongs, []);
  useEffect(() => getSongs(currentPlaylist), [num]);
  return (
    <div className="search-song" key={props.id}>
      <div>{props.title}</div>
      <div className="add-to-playlist-button">
        <AiOutlinePlusCircle
          style={rotate ? { rotate: 45 + "deg" } : { rotate: 0 + "deg" }}
          onClick={() => {
            setShowPlaylists(!showPlaylists);
          }}
        />
      </div>
      {showPlaylists ? (
        <Playlists className="search-song-playlists" func={addSong} />
      ) : //  <>
      //     {list.length > 0
      //       ? list.map((v) => {
      //           return (
      //             <>
      //               <Playlist
      //                 func={() => {
      //                   addSong(v);
      //                   rotateIcon();
      //                 }}
      //                 playlist={v.name}
      //               />
      //             </>
      //           );
      //         })
      //       : null}
      //   </>
      null}
    </div>
  );
}
