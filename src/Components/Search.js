import axios from "axios";
import { useState, useEffect, useContext } from "react";
import SearchSong from "./SearchSong";
import "./Search.css";
import { PlaylistContext } from "../context/context";
export default function Search(props) {
  const [list, setList] = useState([]);
  const [inp, setInp] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const { baseURL } = useContext(PlaylistContext);
  useEffect(() => {
    if (inp) {
      axios
        .get(`${baseURL}/search/${inp}`, {
          headers: {
            authorization: "bearer " + localStorage.token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setList(res.data);
        });
    }
  }, [inp]);
  return (
    <>
      <input
        type={"text"}
        className="search-input"
        placeHolder="    🔎    Look For A song/singer"
        onChange={(e) => {
          setInp(e.target.value);
          console.log(list);
        }}
        onMouseOver={() => {
          if (!isSearch) {
            setIsSearch(true);
          }
        }}
      ></input>

      {list.length ? (
        <div
          id="search-songs"
          className={isSearch ? "change " : ""}
          onMouseLeave={() => {
            if (isSearch) {
              setIsSearch(false);
            }
          }}
        >
          {" "}
          {list.map((v) => {
            return <SearchSong title={v.title} id={v.id} />;
          })}
        </div>
      ) : null}
    </>
  );
}
