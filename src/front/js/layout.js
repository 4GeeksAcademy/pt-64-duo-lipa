import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { GameList } from "./pages/gameList"
import { GamePage } from "./pages/gamePage"
import { ProfilePage } from "./pages/profilePage";
import { Private } from "./pages/private";
import { GameDetails } from "./pages/gameDetails";
import { Search } from "./pages/search";

import injectContext from "./store/appContext";
import { Home } from "./pages/home";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className='site-wide-margin'>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <ConditionalNavbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Private />} path="/private" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<GameList />} path="/gamelist" />
                        <Route element={<GamePage />} path="/gamepage" />
                        <Route element={<ProfilePage />} path="/profilepage" />
                        <Route element={<GameDetails />}  path="/game/:id" />
                        <Route element={<Search />} path="/search" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

const ConditionalNavbar = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <Navbar className={isHome ? "transparent-header" : ""} />
    );
};

export default injectContext(Layout);
