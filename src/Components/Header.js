import { useState } from "react";
import { icons } from "react-icons";
import "./Header.css";
import { IoIosArrowDropdown } from "react-icons/io";
export default function Header(props) {
  const [counter, setCounter] = useState(0);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const openNav = () => {
    setCounter(counter + 1);
    props.setCounter(props.counter + 1);
  };
  const handleLogout = () => {
    props.setIsLogged(localStorage.clear());
    setIsOpenDropdown(false);
  };
  return (
    <>
      <div className="header-container">
        <div className="header-inner-width">
          <span className="header-user-name">
            Hello {localStorage.userName}{" "}
            <IoIosArrowDropdown
              onClick={() => {
                setIsOpenDropdown(!isOpenDropdown);
              }}
            />
          </span>
          {isOpenDropdown ? (
            <button className="disconnect-button" onClick={handleLogout}>
              Disconnect
            </button>
          ) : null}

          <h2>
            <i>SpotItay</i>
          </h2>
          <div
            className={counter % 2 === 1 ? "change hamburger" : "hamburger"}
            onClick={openNav}
          >
            <div id="stripe1"></div>
            <div id="stripe2"></div>
            <div id="stripe3"></div>
          </div>
        </div>
      </div>
    </>
  );
}
