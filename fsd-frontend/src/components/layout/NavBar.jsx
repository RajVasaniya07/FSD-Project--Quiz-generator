import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-0 shadow-sm fixed-top">
            <div className="container-fluid">
            <NavLink className="navbar-brand" to={"/"}>
    <span className="text-2xl font-bold text-white mr-2">
        <i className="fas fa-graduation-cap"></i>
    </span>
    <span className="text-xl font-semibold text-white">Quizify</span>
</NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to={"/login"}>
                                Admin
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to={"/quiz-stepper"}>
                                Take Quiz
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
