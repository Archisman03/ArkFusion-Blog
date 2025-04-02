import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../Redux/user/userSlice';
// VVI see the difference in change when we use redux toolkit
export function SignIn() {
    const [formData, setFormData] = useState({});
    // FOr Error 
    // const [errorMessage, setErrorMessage] = useState(null);
    // const [loading, setLoading] = useState(false);
    //this two are not needed now as we are using redux
    const {loading, error: errorMessage } = useSelector((state) => state.user); 

    //for navigation
    const navigate = useNavigate();
    //initializing redux functions:
    const dispatch = useDispatch();

    // Change in inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    // console.log(formData);


    //SUbmiting
    async function handleSubmit(e) {
        e.preventDefault(); //✅ Prevents page reload when we click on sign up button

        //if any filled in the form is not filledUp
        if (!formData.email || !formData.password) {
            // return setErrorMessage('Please fill out all required filleds');
            //or using redux toolkit:
            dispatch(signInFailure('Please fill out all required filleds'));
        }

        try {
            // start of fetching loading starts
        /*  setLoading(true);
            setErrorMessage(null); 
        */
            //or using redux toolikit we written the logic for setLoading and setErrorMessage in signInStart
            dispatch(signInStart());

            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("Signup Successful:", data);
            // alert("Signup Successful!")
            if (data.success === false) {
                // return setErrorMessage(data.message);
                //or using redux:
                return dispatch(signInFailure(data.message));
            }
            //fetching ended LOADING STOPS
            // setLoading(false) //now we don't need this as redux is been used and the above signInFailure function will setLoading to false

            //navigating to sign-in page when sign-up is successfull
            if(response.ok){
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (err) {
            // setErrorMessage(`Error: ${err.message}`);
            // alert("Signup Failed. Please try again.");
            // setLoading(false); 

            //or using redux toolkit:
            dispatch(signInFailure(err.message));
        }
    }

    return (
        <div className="min-h-screen mt-20">
            {/* here when smaller then md they in arrangement of left right is column wise and larger than or equal to md it's become row*/}
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row items-center">
                {/* left */}
                <div className="">
                    <Link to="/" className="font-bold dark:text-white text-4xl">
                        <span className="px-5 py-2.5 me-2 mb-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl rounded-lg">
                            ArkFusion's Blog
                        </span>
                    </Link>
                    <p className='text-sm mt-5 font-semibold'>
                        This is demo project. You can sign in with your email and password
                        or with Google.
                    </p>
                </div>
                {/* right */}
                <div className="bg-white p-6 rounded-xl shadow-lg w-[450px]">
                    <form
                        // this handleSubmit is the function through each submition likinked to entry into data set of mongo-db
                        onSubmit={handleSubmit} >

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
                            type='submit'
                            disabled={loading}>
                            {
                                loading ? (
                                    <Spinner />
                                ) : 'Sign In'
                            }
                        </button>
                        <div className='flex gap-2 text-sm mt-5'>
                            <span>Don't have an account?</span>
                            <Link to='/sign-in' className='text-blue-500'>
                                Sign Up
                            </Link>
                        </div>
                        <div>
                            {errorMessage && (
                                <div className="w-full flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-100 mt-3">
                                    <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <div>{errorMessage}</div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}
//Spinner Function
function Spinner() {
    return (  // ✅ Added return statement
        <div disabled className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center me-2">
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
            Loading...
        </div>
    );
}