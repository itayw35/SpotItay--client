import React from "react";
import "./Playlist.css";
export default function Playlist(props) {
  return (
    <div onClick={props.func} className="playlist">
      {props.playlist}
    </div>
  );
}
