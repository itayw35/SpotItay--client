import "./Player.css";
// import video from "./IMG_1156.MOV";
export default function Player(props) {
  // const videoRef = useRef();
  const shuffle = function () {
    console.log("ended");
  };
  // useEffect(() => {
  //   videoRef.current.play();
  // });
  return (
    <div className="song-played">
      <div className="title">
        <b>{props.song} </b>
      </div>
      <iframe
        width="560"
        height="315"
        src={
          props.binge
            ? `https://www.youtube.com/embed/${props.id}?autoplay=1?muted=1&playlist=${props.binge}`
            : `https://www.youtube.com/embed/${props.id}?autoplay=1?muted=1`
        }
        title="YouTube video player"
        frameborder="0"
      ></iframe>
      {/* <video ref={videoRef} src={video} onEnded={shuffle}></video> */}
    </div>
  );
}
