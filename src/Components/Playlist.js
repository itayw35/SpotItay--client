import React, { useRef } from "react";
import { useState } from "react";
import "./Playlist.css";
import { RiUserSharedLine } from "react-icons/ri";
export default function Playlist(props) {
  const [isShare, setIsShare] = useState(false);
  const shareRef = useRef();
  return (
    <>
      <div onClick={props.func} className="playlist">
        <span>
          <abbr title="Share">
            {" "}
            <RiUserSharedLine
              onClick={() => {
                setIsShare(!isShare);
              }}
            />
          </abbr>
        </span>
        {props.playlist}
        <button className="remove-button" onClick={props.remove}>
          Remove
        </button>
      </div>
      {isShare ? (
        <>
          <input
            type="email"
            ref={shareRef}
            autoFocus
            className="share-name"
            placeholder="Insert friend's mail"
          ></input>
          <div className="buttons-flex">
            <button
              className="ok-button"
              onClick={() => {
                setIsShare(false);
                props.share(shareRef.current.value);
              }}
            >
              ok
            </button>
            <button className="ok-button" onClick={() => setIsShare(false)}>
              cancel
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}
