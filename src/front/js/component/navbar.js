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
    setUserInfo(sessionStorage.getItem("userInfo"));
  }, [store.user]);

  const handleSignupModal = () => {
    isSignupModalOpen ? setIsSignupModalOpen(false) : setIsSignupModalOpen(true);
  };

  const handleLoginModal = () => {
    isLoginModalOpen ? setIsLoginModalOpen(false) : setIsLoginModalOpen(true);
  };

  const handleLogOut = () => {
    actions.handleLogOut();
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg ps-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">GameScout</a>
          {userInfo ?
            <>
              <button onClick={handleLogOut} type="button" className="btn btn-primary ms-2">Log out</button>
              <Link to="/private" className="btn btn-primary">Private</Link>
            </>
            :
            <>
              <button className="btn btn-primary ms-2" onClick={handleSignupModal}>Sign up</button>
              <button className="btn btn-primary ms-2" onClick={handleLoginModal}>Log in</button>
            </>
          }
          <Link to="/search" className="btn btn-primary">Search</Link>
          <Link to="/" className="btn btn-primary">Home</Link>
        </div>
      </nav>
      {isLoginModalOpen && <LoginModal closeModal={handleLoginModal} />}
      {isSignupModalOpen && <SignupModal closeModal={handleSignupModal} />}
    </>
  );
};
