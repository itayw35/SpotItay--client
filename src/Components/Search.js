import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import SearchSong from "./SearchSong";
import "./Search.css";
import { PlaylistContext } from "../context/context";
export default function Search(props) {
  const [list, setList] = useState([]);
  const [inp, setInp] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const { baseURL } = useContext(PlaylistContext);
  const searchref = useRef();
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
  const styles = {
    search: {
      width:
        searchref?.current?.value && searchref?.current?.value !== ""
          ? 215 + "px"
          : null,
      borderRadius: searchref?.current?.value !== "" ? 30 + "px" : null,
    },
  };
  return (
    <>
      <input
        ref={searchref}
        type={"text"}
        className="search-input"
        style={styles.search}
        placeHolder="    🔎    Look For Songs"
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
          onBlur={() => {
            if (isSearch) setIsSearch(false);
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
