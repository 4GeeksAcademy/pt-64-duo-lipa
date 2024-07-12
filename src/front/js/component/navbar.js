import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SignupModal } from "./signupModal";
import { LoginModal } from "./loginModal";

export const Navbar = () => {


  const [showSingUp, setShowSingUp] = useState(false)
  const [showLogIn, setShowLogIn] = useState(false)
  const handleCloseSingUp = () => setShowSingUp(false)
  const handleCloseLogIn = () => setShowLogIn(false)
  const handleShowSingUp = () => setShowSingUp(true)
  const handleShowLogIn = () => setShowLogIn(true)

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-warning ps-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">LOGO</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="btn btn-primary ms-2" onClick={handleShowLogIn}>Sign in</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-primary ms-2" onClick={handleShowSingUp}>Sign Up</button>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-primary" type="submit"><i class="bi bi-search"></i></button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <LoginModal closeModal={handleCloseLogIn} show={showLogIn} />
      <SignupModal closeModal={handleCloseSingUp} show={showSingUp} />
    </>
  );
};
