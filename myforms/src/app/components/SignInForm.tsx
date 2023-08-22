'use client';

import Logo from "./logo";
import Link from "next/link";
import { useEffect, useState } from "react"
import { MSG } from "../errMsg";
import { loginData } from "../interfaces/loginData";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { login } from "../redux/slices/authSlice";
import { doneLoading, loading } from "../redux/slices/loadingSlice";
import { redirect } from 'next/navigation'
import OauthContainer from "./oauthContainter";
import signIn from "../sign-in/action";
import { cookies } from "next/dist/client/components/headers";

export default function SignInForm() {
    const [account, setAccount] = useState<loginData>({
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
        try {
            const res = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // Cookie: cookies().toString(),
                },
                credentials: "include",
                body: JSON.stringify(account)
            })
            // const res = await signIn(account);
            dispatch(doneLoading())
            if (!res.ok) {
                if (res.status === 500) {
                    setErr(8)
                    return false
                }
                else setErr(7)
                return false
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
                    email: data.email,
                    username: data.username
                }
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("origin", "orgin")
                redirect('/dashboard/forms')
            }
        } catch (error) {
            dispatch(doneLoading())
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
                {/* <div className="mt-2">
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
                </div> */}
                <OauthContainer />
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