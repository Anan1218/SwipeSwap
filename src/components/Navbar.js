import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#4169E0" }}>
            <Link to="/main" style={{ textDecoration: "none" }}>
                <a class="navbar-item" style={{ paddingLeft: "10px", color: "white", textDecoration: "none" }}>Home</a>
            </Link>
            <Link to="/search" style={{ textDecoration: "none" }}>
                <a class="navbar-item" style={{ paddingLeft: "10px", textDecoration: "none", color: "white" }}>Search</a>
            </Link>
            <div class="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
                <ul class="navbar-nav ms-auto flex-nowrap">
                    <li class="nav-item">
                        <Link to="/profile" style={{ textDecoration: "none" }}>
                            <a href="#" class="nav-link m-2 menu-item nav-active" style={{ color: "white" }}>Profile</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};