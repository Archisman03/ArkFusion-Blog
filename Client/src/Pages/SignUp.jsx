import { useState } from 'react';
import { Link } from 'react-router-dom';

export function SignUp() {
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    // console.log(formData);

    async function handleSubmit(e) {
        e.preventDefault(); //✅ Prevents page reload when we click on sign up button
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            console.log("Signup Successful:", data);
            // alert("Signup Successful!")
        } catch (error) {
            console.error("Error:", error);
            alert("Signup Failed. Please try again.");
        }
    }

    return (
        <div className="min-h-screen mt-20">
            {/* here when smaller then md they in arrangement of left right is column wise and larger than or equal to md it's become row*/}
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row items-center gap-5">
                {/* left */}
                <div className="">
                    <Link to="/" className="font-bold dark:text-white text-4xl">
                        <span className="px-5 py-2.5 me-2 mb-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl rounded-lg">
                            ArkFusion's Blog
                        </span>
                    </Link>
                    <p className='text-sm mt-5'>
                        This is demo project. You can sign up with your email and password
                        or with Google.
                    </p>
                </div>
                {/* right */}
                <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                    <form
                        // this handleSubmit is the function through each submition likinked to entry into data set of mongo-db
                        onSubmit={handleSubmit} >
                            
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="username">
                                Your Username
                            </label>
                            <input
                                className="shadow-md border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                onChange={handleChange}//when we will write anything in the inut it will keep track of changing
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="email">
                                Your Email
                            </label>
                            <input
                                className="shadow-md border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="password">
                                Your Password
                            </label>
                            <input
                                className="shadow-md border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                            />
                        </div>
                        <button className="w-full py-2.5 text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl rounded-lg shadow-md transition"
                            type='submit'>
                            Sign Up
                        </button>
                        <div className='flex gap-2 text-sm mt-5'>
                            <span>Have an account?</span>
                            <Link to='/sign-in' className='text-blue-500'>
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}