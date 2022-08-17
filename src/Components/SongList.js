import Song from "./Song";
import { useContext, useEffect, useState } from "react";
import { PlaylistContext } from "../context/context";
import "./SongList.css";
import axios from "axios";

export default function SongList(props) {
  const [getSong, setGetSong] = useState("");
  const { playlist, currentPlaylist, setNum, baseURL } =
    useContext(PlaylistContext);
  const [songList, setSongList] = useState([]);
  const removeSong = function (e, songId) {
    e.stopPropagation();
    console.log(currentPlaylist);
    axios
      .delete(`${baseURL}/playlist/remove-song`, {
        headers: { authorization: "bearer " + localStorage.token },

        data: {
          playlist: currentPlaylist,
          song: songId,
        },
      })
      .then((res) => {
        console.log(res);
        setNum((prevNum) => prevNum + 1);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    console.log(playlist);
    const cup = playlist.findIndex((v) => {
      return v.name === currentPlaylist;
    });
    setSongList(playlist[cup]?.songs);
  }, [playlist, currentPlaylist]);
  // const addSong = function (name, id) {
  //   setSongList([...songList, { songName: name, id: id }]);
  //   // const newSongList = [...songList];
  //   // newSongList.push({ songName: name, id: id });
  //   // setSongList(newSongList);
  // };
  // useEffect(() => {
  //   if (props.songadd.title) {
  //     addSong(props.songadd.title, props.songadd.id);
  //   }
  // }, [props.songadd]);
  useEffect(() => {
    props.choose(getSong);
  }, [getSong]);
  const makeBinge = () => {
    const allSongs = songList
      .map((v) => {
        return v.id;
      })
      .join(",");
    props.setBinge(allSongs);
    props.choose(songList[0]);
  };
  return (
    <div className="song-list-container">
      <div className="song-list-inner-height">
        <div className="song-list-title">
          <span className="playlist-name">{currentPlaylist}</span>
          <button onClick={makeBinge} className="binge">
            Binge
          </button>
        </div>
        <div className="table">
          {songList
            ? songList.map((v) => {
                return (
                  <Song
                    song={v.songName}
                    id={v.id}
                    choose={setGetSong}
                    remove={(e) => {
                      removeSong(e, v.id);
                    }}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
