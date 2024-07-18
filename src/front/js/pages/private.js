import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    actions.handleFetchUserInfo();
  }, []);

  console.log(store.user);
  console.log(store.user_games);

  useEffect(() => {
    if (store.searchResults) {
      setSearchResults(store.searchResults);
    }
  }, [store.searchResults]);

  const handleSearch = e => {
    e.preventDefault();
    actions.searchUsers(searchTerm);
  }

  if (!store.user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {store.user && store.user.username}</h1>
      <p>Email: {store.user && store.user.email}</p>
      {/* Add searchbar to search for other users */}
      <form onSubmit={handleSearch}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search for users" aria-label="Search for a game" aria-describedby="button-addon2" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <button className="btn btn-primary" type="submit" id="button-addon2">Search</button>
        </div>
      </form>
      {/* Add a list of users */}
      <div className="row userList row- gx-4">
        {searchResults.map((user, index) => {
          return (
            <div className="card mx-auto p-2" style={{ marginRight: "18rem" }} key={user.id}>
              <p>{user.username}</p>
              <a className="btn btn-primary" href={`/user/${user.username}`}>profile</a>
            </div>
          );
        })}
      </div>
      {/* Add a list of followers and following */}
      {store.user.followers[0] && <h1>Your Followers:</h1>}
      <div className="row userList row- gx-4">
        {store.user.followers && store.user.followers.map((follower, index) => {
          return (
            <div className="card mx-auto p-2" style={{ marginRight: "18rem" }} key={follower.id}>
              <p>{follower.username}</p>
              <a className="btn btn-primary" href={`/user/${follower.username}`}>profile</a>
            </div>
          );
        })}
      </div>
      {store.user.following && <h1>Users you follow:</h1>}
      <div className="row userList row- gx-4">
        {store.user.following && store.user.following.map((following, index) => {
          return (
            <div className="card mx-auto p-2" style={{ marginRight: "18rem" }} key={following.id}>
              <p>{following.username}</p>
            </div>
          );
        })}
      </div>
      {/* Add a list of games the user has reviewed */}
      <h1>Your Reviews:</h1>
      <div className="row gameList row- gx-4">
        {store.user_games && store.user_games.map((game, index) => {
          return (
            <div className="card mx-auto p-2" style={{ marginRight: "18rem" }} key={game.id}>
              <a href={`/game/${game.game_id}`}>
                <img src={`//images.igdb.com/igdb/image/upload/t_1080p/${game.cover_id}.jpg`} className="card-img-top" alt={game.name} />
              </a>
              <p>review: {game.review}</p>
              <p>rating: {game.rating}</p>
              <p>like: </p>{game.like ? <p>✅</p> : <p>❌</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};