import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";

export function Header() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    return (
        <nav className="border-b-1 p-1 flex items-center justify-between">
            {/* LOGO */}
            <Link to="/" className="whitespace-nowrap text-sm sm:text-xl font-bold dark:text-white">
                <span className="px-5 py-2.5 me-2 mb-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl rounded-lg">
                    ArkFusion's Blog
                </span>
            </Link>

            {/* SEARCH BAR & BUTTON (Aligned to Right) */}
            <div className="flex justify-end">
                <div className="hidden sm:block relative w-full max-w-xs">
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Search..."
                    />
                    <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                </div>
                <button className="sm:hidden p-3 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition">
                    <CiSearch className="w-6 h-4" />
                </button>
            </div>

            {/* Navigation Links (Only visible on larger screens) */}
            <div className="hidden md:flex space-x-8 text-gray-700">
                <Link to="/" className="hover:text-cyan-500">Home</Link>
                <Link to="/about" className="hover:text-cyan-500">About</Link>
                <Link to="/projects" className="hover:text-cyan-500">Projects</Link>
            </div>

            {/* Dark Mode & Sign In */}
            <div className="flex items-center space-x-4 ml-4">
                {/* Moon Icon */}
                <button className="w-10 h-10 hidden sm:flex items-center justify-center border-1 border-slate-400 rounded-2xl">
                    <FaMoon className="w-6 h-6" />
                </button>

                {/* Sign In Button - Adjusted Alignment */}
                <Link to="/sign-in">
                    <button className="text-white sm:text-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Sign In
                    </button>
                </Link>
            </div>

            {/* Dropdown */}
            <div className="md:hidden">
                <button
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                    className="p-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition"
                >
                    <HiMenu className="w-6 h-6" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute right-5 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                        <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</Link>
                        <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About</Link>
                        <Link to="/projects" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Projects</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
