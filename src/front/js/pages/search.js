import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/search.css";

export const Search = () => {
    const { store, actions } = useContext(Context);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    

    useEffect(() => {
        actions.handleFetchPopularGames();
    }, []);

    useEffect(() => {
        if (store.searchResults) {
            setSearchResults(store.searchResults);
        }
    }, [store.searchResults]);

    const handleSearch = e => {
        e.preventDefault();
        actions.handleSearch(searchTerm);
    };

    return (
        <div className="whole-page">
            <div className="search container">
                {<h1 className="text-center">Search for the game you looking for!!</h1> /*change heading */}
                <form onSubmit={handleSearch}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search for a game" aria-label="Search for a game" aria-describedby="button-addon2" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        <button className="btn btn-primary" type="submit" id="button-addon2">Search</button>
                    </div>
                </form>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {searchResults.map((game, index) => {
                        return (
                            <div className="col" key={index}>
                                <div className="card">
                                    <a href={`/game/${game.id}`}>
                                        <img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${game.image_id}.jpg`} className="card-img-top" alt={game.name} />
                                    </a>
                                    <div className="card-body">
                                        <h5 className="card-title">{game.name}</h5>
                                        <p className="card-text">{game.summary}</p>
                                        <a href={`/game/${game.id}`} className="btn btn-primary">Go to game</a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};