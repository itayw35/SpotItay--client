import React from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

export default function Player2(props) {
  const videoSrc = {
    type: "video",
    sources: [
      {
        src: props.id,
        provider: "youtube",
      },
    ],
    options: { autoplay: true },
  };
  return (
    <div>
      <Plyr
        loop={true}
        onEnded={console.log("ended")}
        autoPlay={true}
        muted={true}
        source={videoSrc}
      />
    </div>
  );
}
