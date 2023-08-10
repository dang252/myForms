'use client';

import Logo from "../components/logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faGithubSquare, faLinkedin, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { useEffect, useState } from "react"
import { MSG } from "../errMsg";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { login } from "../redux/slices/authSlice";
import { doneLoading, loading } from "../redux/slices/loadingSlice";
import { redirect } from 'next/navigation'

export default function SignInForm() {
    const [account, setAccount] = useState({
        username: '',
        password: '',
    })
    const [err, setErr] = useState<number>(0)
    const isLoading = useAppSelector((state) => state.LoadingReducer.isLoading)
    const dispatch = useAppDispatch();

    const username = useAppSelector((state) => state.AuthReducer.username)
    useEffect(() => {
        if (username != "") redirect("/")
    }, [username])

    async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(loading());
        const res = await fetch('https://localhost:7299/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(account)
        })
        dispatch(doneLoading())
        if (!res.ok) {
            setErr(7);
            return;
        }
        else {
            const data = await JSON.parse(await res.text())
            dispatch(login({
                username: data.username,
                uid: data.userId,
            }))
            redirect('/')
        }

    }
    return (
        <div className=" w-[400px] h-[550px] bg-light-bg text-light-p  dark:bg-dark-bg dark:text-dark-p rounded-lg p-4 relative">
            <Logo />
            <form className="p-4 flex flex-col h-[446px]" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                handleOnSubmit(e)
            }}>
                <h1 className="text-light-text dark:text-dark-text font-bold text-xl">Sign in</h1>
                <br />
                <div>
                    <label htmlFor="un-input">Email or Username:</label>
                    <input
                        className="rounded-md border-2 w-full p-2"
                        type="text"
                        id="un-input"
                        required
                        onChange={(e) => {
                            setAccount({ ...account, username: e.target.value })
                        }}
                    />
                </div>
                <div className="mt-2">
                    <label htmlFor="pw-input">Password:</label>
                    <input
                        className="rounded-md border-2 w-full p-2"
                        type="password"
                        id="pw-input"
                        required
                        onChange={(e) => {
                            setAccount({ ...account, password: e.target.value })
                        }}
                    />
                </div>
                <div className="mt-2">
                    <p className=" before:content-['-'] after:content-['-'] text-center ">or</p>
                    <div className="flex flex-wrap items-center justify-center gap-3 text-4xl">
                        <div className=" cursor-pointer rounded-md bg-blue-700 text-light-bg flex items-center overflow-hidden w-[35px] transition-all duration-500 hover:w-[165px] h-[35px] p-[2px] ">
                            <FontAwesomeIcon icon={faSquareFacebook} />
                            <div className="text-xs whitespace-nowrap p-1">Sign in with Facebook</div>
                        </div>
                        <div className=" cursor-pointer rounded-md bg-red-700 text-light-bg flex items-center overflow-hidden w-[35px] transition-all duration-500 hover:w-[165px] h-[35px] p-[3px] ">
                            <FontAwesomeIcon icon={faGoogle} className="text-3xl" />
                            <div className="text-xs whitespace-nowrap p-1">Sign in with Google</div>
                        </div>
                        <div className=" cursor-pointer rounded-md bg-sky-700 text-light-bg flex items-center overflow-hidden w-[35px] transition-all duration-500 hover:w-[165px] h-[35px] p-[2px] ">
                            <FontAwesomeIcon icon={faLinkedin} />
                            <div className="text-xs whitespace-nowrap p-1">Sign in with LinkedIn</div>
                        </div>
                        <div className=" cursor-pointer rounded-md bg-black text-light-bg flex items-center overflow-hidden w-[35px] transition-all duration-500 hover:w-[165px] h-[35px] p-[2px] ">
                            <FontAwesomeIcon icon={faGithubSquare} />
                            <div className="text-xs whitespace-nowrap p-1">Sign in with Github</div>
                        </div>
                    </div>
                </div>
                <div className="mt-auto">
                    <p id="warn" className="text-sm text-red-700">{err !== 0 && MSG[err as keyof typeof MSG]}</p>
                    <input
                        className='cursor-pointer bg-light-btn dark:bg-dark-btn text-light-text dark:text-dark-text text-center font-bold px-4 py-2 rounded-md w-full mb-auto mt-5'
                        type='submit'
                        value="Sign in"
                        disabled={isLoading}
                    />
                    <div className="text-sm mt-1">
                        <span>No Account? </span>
                        <Link href='/sign-up' className=" text-sky-600">Sign up</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}