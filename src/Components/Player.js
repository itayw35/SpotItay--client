import { useEffect } from "react";
import "./Player.css";
export default function Player(props) {
  return (
    <div className="song-played">
      <iframe
        className="player"
        src={
          props.binge
            ? `https://www.youtube.com/embed?autoplay=1&playlist=${props.binge}`
            : `https://www.youtube.com/embed/${props.id}?autoplay=1`
        }
        title="YouTube video player"
        frameBorder={0}
        allow="autoplay"
      ></iframe>
    </div>
  );
}
