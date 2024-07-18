import React from 'react';
import '../../styles/loginModal.css';
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../store/appContext';

export function ReviewModal({ closeModal, game }) {
    const { store, actions } = useContext(Context);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);

    async function handleReview() {
        await actions.handleReview(review, rating);
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => closeModal()}>&times;</span>
                <h2>I played...</h2>
                <h1>{game}</h1>
                <form>
                    <label htmlFor="Review">Review:</label>
                    <textarea type="text" className="form-control" placeholder="Add a review..." aria-label="Review" aria-describedby="basic-addon1"
                        onChange={(e) => setReview(e.target.value)} value={review} />
                    <label htmlFor="Rating">Rating:</label>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => setRating(e.target.value)} value={rating}>
                        <option value>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <label htmlFor="Like">like</label>
                    <input type="checkbox" id="like" name="like" value="like" />
                    <button onClick={() => handleReview(review, rating)} type="button">Submit</button>
                </form>
            </div>
        </div>
    );
}