import { useEffect } from "react";
import "./Player.css";
export default function Player(props) {
  useEffect(() => {
    console.log(props.shuffle);
  }, [props.shuffle]);
  return (
    <div className="song-played">
      <iframe
        className="player"
        src={
          props.binge
            ? `https://www.youtube.com/embed/?playlist=${props.binge}&enablejsapi=1&autoplay=1`
            : props.shuffle
            ? `https://www.youtube.com/embed/?playlist=${props.shuffle}&enablejsapi=1&autoplay=1`
            : `https://www.youtube.com/embed/${props.id}?autoplay=1`
        }
        title="YouTube video player"
        frameBorder={0}
        allow="autoplay"
      ></iframe>
    </div>
  );
}
