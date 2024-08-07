import React, { useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { SignupModal } from "./signupModal";
import { LoginModal } from "./loginModal";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});

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
          <Link to="/" className="navbar-brand">GameScout</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {userInfo ?
              <>
                <li className="nav-item">
                  <span className="nav-link cursor" onClick={handleLogOut}>Log out</span>
                </li>
                <li className="nav-item"><Link className="nav-link" to="/profilepage">Profile Page</Link></li>
              </>
              :
              <>
                <li className="nav-item">
                  <span className="nav-link cursor" onClick={handleSignupModal}>Sign up</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link cursor" onClick={handleLoginModal}>Log in</span>
                </li>
              </>
              }
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