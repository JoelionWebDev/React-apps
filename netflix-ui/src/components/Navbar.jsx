import React, { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import styled from "styled-components";
import logo from "../asset/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaPowerOff } from "react-icons/fa";
import { firebaseAuth } from "../utils/firebase-config";

const Navbar = ({ isScrolled }) => {
  const links = [
    { name: "home", link: "/" },
    { name: "TvShow", link: "/TvShows" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];
  const navigate = useNavigate();
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHOver] = useState(false);
  return (
    <Container>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "showSearch" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="search"
              onMouseEnter={() => setInputHOver(true)}
              onMouseLeave={() => setInputHOver(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHOver(false);
              }}
            />
          </div>
          <button
            onClick={() => {
              alert("logOut succesful");
              signOut(firebaseAuth);
            }}
          >
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
};
const Container = styled.div`
  .scrolled {
    background-color: block;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0 4rem;
    align-item: cneter;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      botton {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          svg {
            color: white;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .showSearch {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;
export default Navbar;
