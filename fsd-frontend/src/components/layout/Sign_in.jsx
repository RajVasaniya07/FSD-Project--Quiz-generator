import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Header from '../common/Header';

const Sign_in = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email,
            password
        };

        // try {
            // const response = await axios.post('http://localhost:8080/login', data);
            // console.log(response.data);
            // localStorage.setItem('userId', response.data);
            // alert("Login successful!");
            if (email === 'admin@gmail.com' && password === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        // } catch (error) {
        //     if (error.response && error.response.status === 401) {
        //         setError("Incorrect email or password.");
        //     } else {
        //         setError("Login failed. Please try again later.");
        //     }
        //     console.error(error);
        // }
    };

    return (
        <>
            {/* <Header /> */}
            <div className="w-full mt-20 mb-20 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-sky-950">
                <div className="px-6 py-4">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                    </div>

                    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                        Welcome Back
                    </h3>

                    <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                        Login or create account
                    </p>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="w-full mt-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Email Address
                            </label>
                            <input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-100 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                type="email"
                                placeholder="Email Address"
                                required
                            />
                        </div>

                        <div className="w-full mt-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Password
                            </label>
                            <input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            {/* <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">
                                Forget Password?
                            </a> */}

                            <button
                                type="submit"
                                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>

                {/* <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>

                    <a href="/register" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</a>
                </div> */}
            </div>
        </>
    );
}

export default Sign_in;