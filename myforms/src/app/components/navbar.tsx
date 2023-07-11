'use client'

import Link from "next/link"
import Logo from "./logo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import ThemeBtn from "./themeBtn"

export default function Navbar() {
    return (
        <div className="fixed top-0 shadow-md w-full z-10 flex items-center bg-light-bg dark:bg-dark-bg text-ligt-text dark:text-dark-text">
            <Link href={"/"} className="w-fit block">
                <Logo />
            </Link>
            <div className="overflow-hidden ml-auto mr-2 hover:cursor-pointer hover:bg-light-sec dark:hover:bg-dark-sec flex justify-center items-center rounded-full w-12 h-12 ite">
                <ThemeBtn />
            </div>
            {/* <Link href={"/"} className="rounded-full shadow-md w-12 h-12 flex justify-center items-center hover:bg-light-sec dark:hover:bg-dark-sec" >
                <FontAwesomeIcon icon={faUser} className="h-6 w-6 text-2xl " />
            </Link> */}
            <div className=" mr-1">
                <Link href={'/sign-in'} className="hover:bg-light-sec dark:hover:bg-dark-sec rounded-md py-4 px-1 font-bold">Sign in</Link>
                <Link href={'/sign-up'} className="hover:bg-light-sec dark:hover:bg-dark-sec rounded-md py-4 px-1 font-bold ml-2">Sign up</Link>
            </div>
        </div>
    )
}