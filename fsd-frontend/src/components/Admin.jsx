import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <section className="container my-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-8 text-center">
                    <h2 className="display-4 mb-4">Welcome to Admin Panel</h2>
                    <p className="lead mb-5">Take control of your quizzes</p>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Create a New Quiz</h5>
                            <p className="card-text">Start building a new quiz and engage your users.</p>
                            <Link to="/create-quiz" className="btn btn-primary">Get Started</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Manage Existing Quizzes</h5>
                            <p className="card-text">View, edit, or delete your existing quizzes.</p>
                            <Link to="/all-quizzes" className="btn btn-secondary">Explore Quizzes</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Admin;
