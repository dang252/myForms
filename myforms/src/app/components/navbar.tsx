'use client'

import Link from "next/link"
import Logo from "./logo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import ThemeBtn from "./themeBtn"
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from "../redux/hook"
import SignOutBtn from "./signOutBtn"
// import { logout } from "../redux/slices/authSlice";
// import { signOut } from "next-auth/react"

export default function Navbar() {
    const username = useAppSelector((state) => state.AuthReducer.username)
    // const dispatch = useAppDispatch();
    useEffect(() => {
        var nav = document.getElementById('navbar')
        function scrollHandle() {
            if (window.scrollY > 10) {
                nav?.classList.add("shadow-lg")
                nav?.classList.remove('border-b-[1px]')
            }
            else {
                nav?.classList.remove('shadow-lg')
                nav?.classList.add('border-b-[1px]')
            }
        }

        window.addEventListener('scroll', scrollHandle);

        return () => {
            window.removeEventListener('scroll', scrollHandle);
        };
    }, []);

    return (
        <div id="navbar" className=" min-h-[60px] border-b-[1px] border-gray-200 dark:border-gray-600 sticky top-0 w-full z-10 flex items-center bg-light-bg dark:bg-dark-bg text-ligt-text dark:text-dark-text text-sm sm:text-lg transition-all">
            <Link href={"/"} className="sm:ml-5 ml-2 sm:w-[150px] w-[100px] block transition-all">
                <Logo />
            </Link>
            <div className="overflow-hidden ml-auto mr-2 hover:cursor-pointer hover:bg-light-sec dark:hover:bg-dark-sec flex justify-center items-center rounded-full sm:w-12 sm:h-12 w-6 h-6 transition-all">
                <ThemeBtn />
            </div>
            {/* <Link href={"/"} className="rounded-full shadow-md w-12 h-12 flex justify-center items-center hover:bg-light-sec dark:hover:bg-dark-sec" >
                <FontAwesomeIcon icon={faUser} className="h-6 w-6 text-2xl " />
            </Link> */}
            {
                username != ""
                    ? <div className=" mr-1 flex">
                        <div>
                            <div className="hover:bg-light-sec dark:hover:bg-dark-sec rounded-md py-4 px-1 font-bold mr-2">Hi, {username}</div>
                        </div>
                        {/* <div>
                            <button className="hover:bg-light-sec dark:hover:bg-dark-sec rounded-md py-4 px-1 font-bold" onClick={onLogout}>Sign Out</button>
                        </div> */}
                        <SignOutBtn />
                    </div>
                    : <div className=" mr-1 flex items-center">
                        <div>
                            <Link href={'/sign-in'} className=" h-4/6 flex items-center hover:bg-light-sec dark:hover:bg-dark-sec rounded-md py-4 px-1 font-bold mr-2">Sign in</Link>
                        </div>
                        <div>
                            <Link href={'/sign-up'} className="h-4/6 flex items-center hover:bg-light-sec dark:hover:bg-dark-sec rounded-md py-4 px-1 font-bold">Sign up</Link>
                        </div>

                    </div>
            }
        </div>
    )
}