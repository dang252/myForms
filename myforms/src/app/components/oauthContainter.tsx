'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faGithubSquare, faLinkedin, faGoogle } from "@fortawesome/free-brands-svg-icons"
import React, { useEffect, useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react"
import NewWindow from 'react-new-window'
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { login } from "../redux/slices/authSlice";
import { doneLoading, loading } from "../redux/slices/loadingSlice";

export default function OauthContainer() {
    const [popup, setPopUp] = useState<boolean>(false);
    const { data: session, status } = useSession();
    const dispatch = useAppDispatch();
    useEffect(() => {
        async function databaseHandle() {
            try {
                const res = await fetch('http://localhost:3000/api/oauth', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        Email: session?.user?.email,
                        Username: session?.user?.name,
                    })
                })
                if (!res.ok) {
                    signOut()
                    return false;
                }
                else {
                    const data = await JSON.parse(await res.text())
                    dispatch(login({
                        username: data.username,
                        uid: data.userId,
                        origin: "origin",
                    }))
                    const user = {
                        id: data.userId,
                        email: data.Email,
                        username: data.Username
                    }
                    localStorage.setItem("user", JSON.stringify(user))
                    localStorage.setItem("accessToken", data.accessToken);
                    localStorage.setItem("origin", "oauth")
                    return true;
                }
            } catch (error) {
                signOut()
                return false
            }
        }

        if (session) {
            dispatch(loading);
            databaseHandle();
            dispatch(doneLoading);
        }
    }, [session, dispatch])

    const SignInHandler = (provider: string) => {
        signIn(provider)
    }
    // const CloseHandler = () => {
    //     dispatch(doneLoading)
    //     setPopUp(false);
    // }

    return (
        <div className="mt-auto">
            <p className=" before:content-['-'] after:content-['-'] text-center ">or</p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-4xl">
                <div
                    className=" cursor-pointer rounded-md bg-blue-700 text-light-bg flex items-center overflow-hidden w-[35px] transition-all duration-500 hover:w-[165px] h-[35px] p-[2px] "
                    onClick={() => { SignInHandler("facebook") }}
                >
                    <FontAwesomeIcon icon={faSquareFacebook} />
                    <div className="text-xs whitespace-nowrap p-1">Sign in with Facebook</div>
                </div>
                <div
                    className=" cursor-pointer rounded-md bg-red-700 text-light-bg flex items-center overflow-hidden w-[35px] transition-all duration-500 hover:w-[165px] h-[35px] p-[3px] "
                    onClick={() => { SignInHandler("google") }}
                >
                    <FontAwesomeIcon icon={faGoogle} className="text-3xl" />
                    <div className="text-xs whitespace-nowrap p-1">Sign in with Google</div>
                </div>
                {/* <a href={`/oauth/google`} target="_blank" rel="noopener noreferrer">
                    <div
                        className=" cursor-pointer rounded-md bg-red-700 text-light-bg flex items-center overflow-hidden w-[35px] transition-all duration-500 hover:w-[165px] h-[35px] p-[3px] "
                    // onClick={() => { SignInHandler("google") }}
                    >
                        <FontAwesomeIcon icon={faGoogle} className="text-3xl" />
                        <div className="text-xs whitespace-nowrap p-1">Sign in with Google</div>
                    </div>
                </a> */}
                {/* <div
                    className=" cursor-pointer rounded-md bg-sky-700 text-light-bg flex items-center overflow-hidden w-[35px] transition-all duration-500 hover:w-[165px] h-[35px] p-[2px] "
                // onClick={() => { SignInHandler("google") }}
                >
                    <FontAwesomeIcon icon={faLinkedin} />
                    <div className="text-xs whitespace-nowrap p-1">Sign in with LinkedIn</div>
                </div> */}
                <div
                    className=" cursor-pointer rounded-md bg-black text-light-bg flex items-center overflow-hidden w-[35px] transition-all duration-500 hover:w-[165px] h-[35px] p-[2px] "
                    onClick={() => { SignInHandler("github") }}
                >
                    <FontAwesomeIcon icon={faGithubSquare} />
                    <div className="text-xs whitespace-nowrap p-1">Sign in with Github</div>
                </div>
            </div>
            {/* {popup && !session ? (
                <NewWindow url={`/oauth/${provider}`} onUnload={() => CloseHandler()} />
            ) : null} */}
        </div>
    );
}