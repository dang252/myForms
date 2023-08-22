'use client';
import { cookies } from "next/dist/client/components/headers";
// import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from "../redux/hook"
import { logout } from "../redux/slices/authSlice";
import { signOut } from "next-auth/react"

export default function SignOutBtn() {
    const dispatch = useAppDispatch();
    const onSignOut = async () => {
        dispatch(logout())
        const origin = localStorage.getItem("origin")
        if (origin == "oauth") {
            signOut();
        }
        localStorage.removeItem("accessToken")
        await fetch('http://localhost:3000/api/logout', {
            method: 'GET',
            credentials: "include",
        })
    }
    return (
        <div>
            <button className="hover:bg-light-sec dark:hover:bg-dark-sec rounded-md py-4 px-1 font-bold" onClick={onSignOut}>Sign Out</button>
        </div>
    );
}