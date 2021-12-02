import React from 'react';
import logo from '../images/logo.png';
import SignIn from './SignIn';
export default function Landing() {
    return (
        <div className="mainBackground">
            <img src={logo} style={{ height: "100px" }}></img>
            <h1 class="lead" style={{ color: "white" }}>Swipe Swap: A program to help you find swipes at UCLA.</h1>
            <SignIn />
        </div >
    );
}