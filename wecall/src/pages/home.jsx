import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Menu from "../components/menu/menu";

const Home = () => {

    const [roomId, setRoomId] = useState('');

    const navigate = useNavigate();

    const handleRoomIdChange = (e) =>{
        setRoomId(e);
    }

    /* handle create room*/
    const handleCreateRoom = () => {
        console.log('called');
        navigate('/videocall');
    }
    
    /* handle join room*/
    const handleJoinRoom = () =>{
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#ffffff]">
            <div class="container my-5">
                <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                    <div className="row">
                        <div className="col col-lg-1">
                            <Menu />
                        </div>
                    </div>
                    <div class="col-lg-7 p-4 p-lg-5 pt-lg-3">
                        <h1 class="display-4 fw-bold lh-1">Welcome to WeCall</h1>
                        <p class="lead">Connect Beyond Boundaries: Where Every Pixel Tells a Story!</p>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                            <input placeholder="ROOM ID" onChange={(e) => handleRoomIdChange(e.target.value)}/>
                            <button type="button" class="btn btn-primary btn-lg px-4 me-md-2 fw-bold" onSubmit={handleJoinRoom}>Join room</button>
                            <button type="button" class="btn btn-outline-secondary btn-lg px-4" onClick={handleCreateRoom}>Create room</button>
                        </div>
                    </div>
                    <div class="col-lg-3 offset-lg-1 p-0 overflow-hidden shadow-lg">
                        <img class="rounded-lg-3" src="../src/assets/images/landing_pic.jpg" alt="landing_image" />
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Home;