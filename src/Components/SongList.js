import Song from "./Song";
import { useContext, useEffect, useState } from "react";
import { PlaylistContext } from "../context/context";
import "./SongList.css";
import axios from "axios";
import { FaRegPlayCircle } from "react-icons/fa";
import { BsShuffle } from "react-icons/bs";
export default function SongList(props) {
  const [getSong, setGetSong] = useState({});
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
  useEffect(() => {
    props.choose(getSong);
    props.setBinge(undefined)
  }, [getSong]);
  const makeBinge = () => {
    const allSongs = songList
      .map((v) => {
        return v.id;
      })
      .join(",");
    props.setBinge(allSongs);
  };
  const makeShuffle = function () {
    let shuffledArr = songList.map((v) => {
        return v.id;
      }),
      song = "",
      i = 0,
      i2 = 0;
    for (let n in songList) {
      i = Math.round(Math.random() * (songList.length - 1));
      i2 = Math.round(Math.random() * (songList.length - 1));
      song = shuffledArr[i2];
      shuffledArr[i2] = shuffledArr.splice(i, 1, song).toString();
    }
    const allSongs = shuffledArr.join(",");
    props.setBinge(allSongs);
  };
  return (
    <div className="song-list-container">
      <div className="song-list-inner-height">
        <div className="song-list-title">
          <span className="playlist-name">{currentPlaylist}</span>
          <div onClick={makeBinge} className="binge">
            <abbr title="Play">
              <FaRegPlayCircle />
            </abbr>
          </div>
          <div onClick={makeShuffle} className="binge">
            <abbr title="Shuffle">
              <BsShuffle />
            </abbr>
          </div>
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
