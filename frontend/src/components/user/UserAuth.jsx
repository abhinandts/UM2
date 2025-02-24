import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import logo from '../../assets/logo.png';

const UserAuth = () => {
    const [signUpForm, setSignUpForm] = useState(false);
    const [error, setError] = useState("");
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const toggle = () => {
        setSignUpForm(!signUpForm);
    };

    const submitForm = async (event) => {
        event.preventDefault();
        setError("");

        if (signUpForm) {

            const userData = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            };

            try {
                const response = await fetch("http://localhost:5000/api/user/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData),
                    credentials: "include"
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Registration failed");
                }

                alert("User registered successfully!");
            } catch (err) {
                setError(err.message);
            }
        } else {
            // Login User
            const userData = {
                email: emailRef.current.value,
                password: passwordRef.current.value
            };

            try {
                const response = await fetch("http://localhost:5000/api/user/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(userData)
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Login Failed");
                }

                alert("User Login successful");

                // Navigate to Home after successful login
                navigate("/");

            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img alt="Your Company" src={logo} className="mx-auto h-20 w-auto" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    {signUpForm ? "Sign Up" : "Sign In"}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={submitForm} className="space-y-6">
                    {signUpForm && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                User Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                ref={nameRef}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email ID
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            ref={emailRef}
                            required
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            ref={passwordRef}
                            required
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500"
                    >
                        {signUpForm ? "Sign Up" : "Sign In"}
                    </button>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    {signUpForm ? "Already our user?" : "Not a member?"}
                    <button onClick={toggle} className="font-semibold text-indigo-600 hover:text-indigo-500">
                        {signUpForm ? "Sign In" : "Sign Up"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default UserAuth;
