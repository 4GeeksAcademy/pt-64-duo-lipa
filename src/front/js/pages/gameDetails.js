import { Context } from "../store/appContext";
import React from "react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useContext } from 'react';
import { ReviewModal } from "../component/reviewModal";

export const GameDetails = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleReviewModal = () => {
    isReviewModalOpen ? setIsReviewModalOpen(false) : setIsReviewModalOpen(true);
  };

  const fetchGameDetails = async () => {
    const response = await fetch(process.env.BACKEND_URL + 'fetch_game/' + id);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setGame(data);
    }
};

  useEffect(() => {
    actions.handleFetchUserInfo();
    fetchGameDetails();
  }, [id]);

  useEffect(() => {
    setUserInfo(sessionStorage.getItem("userInfo"));
  }, [store.user]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{game.name}</h1>
      <p>{game.summary}</p>
      <h3>IGDB Rating:</h3>
      <p>{game.rating}</p>
      {userInfo && <button onClick={handleReviewModal} type="button" className="btn btn-primary">Review</button>}
      {isReviewModalOpen && <ReviewModal closeModal={handleReviewModal} game={game.name} />}
      <br></br>
      <h1>official artworks:</h1>
      {game.artworks && game.artworks.map((artwork, index) => {
        return <img key={index} src={`//images.igdb.com/igdb/image/upload/t_1080p/${artwork.image_id}.jpg`} className="card-img-top" alt={game.name} />;
      })}
      <br></br>
      <h1>screenshots:</h1>
      {game.screenshots && game.screenshots.map((screenshot, index) => {
        return <img key={index} src={`//images.igdb.com/igdb/image/upload/t_1080p/${screenshot.image_id}.jpg`} className="card-img-top" alt={game.name} />;
      })}
    </div>
  );
};