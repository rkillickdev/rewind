import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/cassette-orange-logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import useAlert from "../hooks/useAlert";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const { setAlert } = useAlert();

  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setAlert("You are now logged out", "success");
      setCurrentUser(null);
    } catch (err) {
      // console.log(err);
      setAlert(err.message, "warning");
    }
  };

  const addPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/snapshots/create"
    >
      <i className="far fa-plus-square"></i>Add snapshot
    </NavLink>
  );
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-stream"></i>For You
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/pinned"
      >
        <i className="fa-solid fa-bookmark"></i>Pinned
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fa-solid fa-right-to-bracket"></i>Sign in
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fa-solid fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand className="d-flex align-items-center">
            <img src={logo} alt="casette tape logo" height="60" />
            <h1>Rewind</h1>
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => {
            setExpanded(!expanded);
          }}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fa-solid fa-house"></i>Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
