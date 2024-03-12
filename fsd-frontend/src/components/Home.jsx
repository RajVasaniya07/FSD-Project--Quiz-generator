import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <main className="container mt-5" style={{ marginLeft: "100px" }}>
            <div className="row">
                <div className="col-md-8 offset-md-2 text-center">
                    <h1 className="display-4 mb-4">Welcome to <span className="text-primary">Quizify</span></h1>
                    <p className="lead mb-4">The ultimate destination for fun and challenging quizzes!</p>
                    <div className="row mt-5">
                        <div className="col-md-3 mb-4">
                            <div className="card bg-light shadow-sm h-100">
                                <div className="card-body">
                                    <h3 className="card-title text-primary">Step 1</h3>
                                    <p className="card-text">Select a subject</p>
                                    <p className="card-text">Choose from a variety of topics to start your quiz.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="card bg-light shadow-sm h-100">
                                <div className="card-body">
                                    <h3 className="card-title text-primary">Step 2</h3>
                                    <p className="card-text">Select the length</p>
                                    <p className="card-text">Choose the number of questions for your quiz.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="card bg-light shadow-sm h-100">
                                <div className="card-body">
                                    <h3 className="card-title text-primary">Step 3</h3>
                                    <p className="card-text">Start your quiz</p>
                                    <p className="card-text">Answer questions and challenge yourself!</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="card bg-light shadow-sm h-100">
                                <div className="card-body">
                                    <h3 className="card-title text-primary">Step 4</h3>
                                    <p className="card-text">See your score card</p>
                                    <p className="card-text">Review your performance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link to="/quiz-stepper" className="btn btn-lg btn-primary rounded-pill px-5 py-3 animate__animated animate__bounce">
                            <span style={{ marginRight: "10px" }}>Start Quiz</span>
                            <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
