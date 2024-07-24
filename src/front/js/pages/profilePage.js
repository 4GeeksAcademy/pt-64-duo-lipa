import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import edImage from "../../img/edring.jpeg"
import payday from "../../img/payday.jpeg"
import redImage from "../../img/red.jpeg"
import gollum from "../../img/gollum.jpeg"
import profilepic from "../../img/profilepic.jpeg"
// import FollowButton from "../component/followButton";

export const ProfilePage = () => {
    const { store, actions } = useContext(Context);
    const popularGameElements = [];
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        actions.handleFetchUserInfo();
        actions.handleFetchPopularGames();
    }, []);

    useEffect(() => {
        setUserInfo(sessionStorage.getItem("userInfo"));
    }, [store.user]);


    for (let i = 0; i < 8; i++) {
        if (store.popularGames && store.popularGames[i]) {
            popularGameElements.push(
                <div className="card mx-auto p-2" style={{ marginRight: "18rem" }} key={store.popularGames[i].id}>
                    <a href={`/game/${store.popularGames[i].id}`}>
                        <img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${store.popularGames[i].image_id}.jpg`} className="card-img-top" alt={store.popularGames[i].name} />
                    </a>
                </div>
            );
        }
    }
    console.log(store.user)
    return (
        <div className="container py-2">
            <div className=" row">
                <div className=" col-2">
                    <div className="profilePic picture card border border-warning" style={{}}>
                        <img src={profilepic} className="card-img-top rounded-circle" height="200px" alt="..." />
                    </div>
                </div>
                <div className=" col-8 ">
                    <ul className="list-group list-group-flush ">
                        <li className="userInfo list-group-item " placeholder="Name">{userInfo?.name}</li>
                        {/* <li className="userInfo list-group-item">A second item</li>
                        <li className="userInfo list-group-item">A third item</li> */}

                    </ul>
                </div>
                {/* <div className=" col-2">
                        {FollowButton}
                    </div> */}
            </div>

            <br></br>
            {/*list of popular games. click to go to game page*/}
            <div className="col-auto d-flex mx-auto p-4 gap-4 ">
                {popularGameElements}
            </div>
            <div className="row g-0">
                <div className="card my-3 mx-auto" style={{ maxWidth: "540px" }}>
                    <div className="d-flex align-items-center">
                        <div className="col-md-4 p-2">
                            <img
                                src={edImage}
                                className="reviewsPicCod img-fluid rounded"
                                alt="..."
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Elden Ring</h5>
                                <p className="card-text">
                                    Elden Ring is a masterpiece, having mastered the art of showing without telling.  As a result, it is very different from other open-world games
                                </p>
                                <p className="card-text">
                                    <small className="starOne text-body-secondary d-flex ">
                                        <p>Review by <b>Jsmith02</b></p>
                                        <div className="text-warning ps-2">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star-half-stroke"></i>
                                        </div>
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card my-3 mx-auto" style={{ maxWidth: "540px" }}>
                    <div className="d-flex align-items-center">
                        <div className="col-md-4 p-2">
                            <img
                                src={redImage}
                                className="reviewsPic img-fluid rounded"
                                alt="..."
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Red Dead Redemption III</h5>
                                <p className="card-text">
                                    The game is amazing the storyline is mind blowing so freaking good man I played it about three times and soon enough I’m going to play it again it’s just that good for me personally.
                                </p>
                                <p className="card-text">
                                    <small className="text-body-secondary d-flex ">
                                        <p>Review by <b>Luckyhusky</b></p>
                                        <div className="text-warning ps-2">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-0">
                <div className="card my-3 mx-auto" style={{ maxWidth: "540px" }}>
                    <div className="d-flex align-items-center">
                        <div className="col-md-4 p-4">
                            <img
                                src={gollum}
                                className="reviewsPic img-fluid rounded"
                                alt="..."
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">The Lord of the Rings: Gollum</h5>
                                <p className="card-text">
                                    I wish I could unplay this game and burn its existence from my mind. I gave it 1 star cause I can't give it zero
                                </p>
                                <p className="card-text">
                                    <small className="text-body-secondary d-flex">
                                        <p>Review by <b>Incog nito</b></p>
                                        <div className="text-warning ps-2">
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card my-3 mx-auto" style={{ maxWidth: "540px" }}>
                    <div className="d-flex align-items-center">
                        <div className="col-md-4 p-4">
                            <img
                                src={payday}
                                className="reviewsPicStr img-fluid rounded-start"
                                alt="..."
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Payday 3</h5>
                                <p className="card-text">
                                    The gunplay is as fun if not better than payday 2, though some guns like the zip commando and compact 7 feel like underpowered pea shooters.
                                </p>
                                <p className="card-text">
                                    <small className="text-body-secondary d-flex ">
                                        <p>Review by <b>Sankipanki</b></p>
                                        <div className="text-warning ps-2">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star-half-stroke"></i>
                                        </div>
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row pt-4" >
                <ul className="following col-6 ">
                    <li className="list-group-item text-center"><h4><b>Followers</b></h4></li>
                    <li className="list-group-item"><b>Sankipanki</b></li>
                    <li className="list-group-item"><b>Incog nito</b></li>
                    <li className="list-group-item"><b>DKaren78</b></li>
                    <li className="list-group-item"><b>Tugor</b></li>
                </ul>
                <ul className="follower col-6">
                    <div className="followList">
                        <li className="list-group-item text-center"><h4><b>Following</b></h4></li>
                        <li className="list-group-item"><b>JamesA</b></li>
                        <li className="list-group-item"><b>rosamaria</b></li>
                        <li className="list-group-item"><b>Sankipanki</b></li>
                        <li className="list-group-item"><b>Erickman25</b></li>
                    </div>
                </ul>
            </div>
            <br></br>
        </div>
    );
};

