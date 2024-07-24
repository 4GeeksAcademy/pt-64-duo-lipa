import React, { useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { SignupModal } from "./signupModal";
import { LoginModal } from "./loginModal";
import logo from "../../img/logo.png"

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    actions.handleFetchUserInfo();
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem("userInfo");
    if (user) {
      setUserInfo(JSON.parse(user));
    } else {
      setUserInfo(null);
    }
  }, [store.user]);

  const handleSignupModal = () => {
    setIsSignupModalOpen(!isSignupModalOpen);
  };

  const handleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleLogOut = () => {
    actions.handleLogOut();
    setUserInfo(null);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand"><img src="https://i.imgur.com/a6HO6pi.png" height="70px" style={{ "margin": "-10px" }} /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <span className="nav-link cursor" onClick={handleSignupModal}>Sign up</span>
              </li>
              <li className="nav-item">
                <span className="nav-link cursor" onClick={handleLoginModal}>Log in</span>
              </li>
              {store.token ? <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Menu
                </a>
                <ul className="dropdown-menu bg-warning" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/gamelist">Game List</Link></li>
                  <li><Link className="dropdown-item" to="/gamepage">Game Page</Link></li>
                  <li><Link className="dropdown-item" to="/profilepage">Profile Page</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item text-danger " href="#" onClick={handleLogOut}>Log out</a></li>
                </ul>
              </li> : null}


              <li className="nav-item">
                <Link to="/search" className="nav-link">Search</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {isLoginModalOpen && <LoginModal closeModal={handleLoginModal} />}
      {isSignupModalOpen && <SignupModal closeModal={handleSignupModal} />}
    </>
  );
};