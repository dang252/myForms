'use client';
import Logo from "../components/logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faGithubSquare, faLinkedin, faGoogle } from "@fortawesome/free-brands-svg-icons"
import DatePicker from "./datepicker";
import { UserAccount } from "../interfaces/UserAccount";
import { useState, useEffect } from "react";
import { MSG } from "../errMsg";
import { regexEmail, regexPassword, regexTel } from "../regex";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { login } from "../redux/slices/authSlice";
import { doneLoading, loading } from "../redux/slices/loadingSlice";
import { redirect } from 'next/navigation'

function ContinueHandle() {
    const form = document.getElementById('sign-up-form')
    form?.classList.add('translate-x-[-50%]')
}

function GobackHandle() {
    const form = document.getElementById('sign-up-form')
    form?.classList.remove('translate-x-[-50%]')
}

export default function SignUpForm() {
    const [account, setAccount] = useState<UserAccount>(
        {
            username: '',
            email: '',
            password: '',
            dob: new Date(),
            phoneNumber: '',
            gender: 'male'
        }
    )
    const [repw, setRepw] = useState<string>('');
    const cantCont: boolean = (account.email !== '' && account.password !== '' && repw !== '') ? false : true
    const [err, setErr] = useState<number>(0)

    // const isLoading = useAppSelector((state) => state.LoadingReducer.isLoading)
    const dispatch = useAppDispatch();

    const username = useAppSelector((state) => state.AuthReducer.username)
    useEffect(() => {
        if (username != "") redirect("/")
    }, [username])


    function ContinueRegex() {
        if (account.email === '' || !regexEmail.test(account.email)) {
            setErr(1);
            return false
        }
        else if (account.password === '' || !regexPassword.test(account.password)) {
            setErr(2);
            return false;
        }
        else if (account.password !== repw) {
            setErr(3);
            return false;
        }
        setErr(0)
        return true
    }

    async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()
        dispatch(loading());
        const res = await fetch('https://localhost:7299/auth/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(account)
        })
        const data = await res.text();
        if (!res.ok) {
            if (data.includes("Email")) {
                setErr(5);
                return;
            }
            else if (data.includes("Username")) {
                setErr(6);
                return;
            }
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
    console.log(account.gender)
    return (
        <div className=" w-[400px] h-[600px] bg-light-bg text-light-p  dark:bg-dark-bg dark:text-dark-p rounded-lg p-4 flex flex-col flex-wrap overflow-hidden relative">
            <Logo />
            <h1 className="text-light-text dark:text-dark-text font-bold text-xl  px-4">Sign up</h1>
            <form id='sign-up-form' className=" w-[200%] h-[468px] inline-flex transition-translate duration-500" onSubmit={(e) => { handleOnSubmit(e) }} onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
                <div className="w-1/2 flex flex-col px-4">
                    <div className="mt-2">
                        <label htmlFor="email-input">Email:</label>
                        <input
                            className="rounded-md border-2 w-full p-2"
                            type="text"
                            value={account.email}
                            onChange={(e) => {
                                setAccount({ ...account, email: e.target.value })
                            }}
                            id='email-input' name='email-input'
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="pw-input">Password:</label>
                        <input
                            className="rounded-md border-2 w-full p-2"
                            type="password"
                            value={account.password}
                            onChange={(e) => {
                                setAccount({ ...account, password: e.target.value })
                            }}
                            id='pw-input' name='pw-input'
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="repw-input">Confirm password:</label>
                        <input
                            className="rounded-md border-2 w-full p-2"
                            type="password"
                            value={repw}
                            onChange={(e) => {
                                setRepw(e.target.value)
                            }}
                            id='repw-input' name='repw-input'
                            required
                        />
                    </div>
                    <div className="mt-auto">
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
                        <button
                            disabled={cantCont}
                            type="button"
                            onClick={() => { if (ContinueRegex()) ContinueHandle() }}
                            className='bg-light-btn dark:bg-dark-btn disabled:text-light-sec text-light-text dark:disabled:text-dark-sec dark:text-dark-text text-center font-bold px-4 py-2 rounded-md w-full mb-auto mt-5'
                        >Continue</button>
                        <div className="text-sm mt-1">
                            <span>Already have an account? </span>
                            <Link href='/sign-in' className=" text-sky-600">Sign in</Link>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 px-4 right-0 flex flex-col">
                    <div className="mt-2">
                        <label htmlFor="un-input">Username:</label>
                        <input
                            className="rounded-md border-2 w-full p-2"
                            type="text"
                            value={account.username}
                            onChange={(e) => {
                                setAccount({ ...account, username: e.target.value })
                            }}
                            id='un-input' name='un-input'
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="phone-input">Phone number:</label>
                        <input
                            className="rounded-md border-2 w-full p-2"
                            type="text"
                            value={account.phoneNumber}
                            onChange={(e) => {
                                setAccount({ ...account, phoneNumber: e.target.value })
                            }}
                            id='phone-input' name='phone-input'
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <label>Date of birth:</label>
                        <DatePicker EndYear={2023} StartYear={1970} handleOnChange={(dob: Date) => { setAccount({ ...account, dob: dob }) }} />
                    </div>
                    <div className="mt-2">
                        <label>Gender:</label>
                        <div className="leading-5 mt-2">
                            <input
                                className='mr-2 h-5 w-5'
                                name='gender'
                                type='radio'
                                value='male'
                                checked={account.gender === 'male' ? true : false}
                                onChange={() => { setAccount({ ...account, gender: 'male' }) }}
                                id='male-radio'
                            />
                            <label className=" align-top" htmlFor="male-radio">Male</label>
                            <input
                                className='ml-4 mr-2 h-5 w-5'
                                name='gender'
                                type='radio'
                                value='female'
                                checked={account.gender === 'female' ? true : false}
                                onChange={() => { setAccount({ ...account, gender: 'female' }) }}
                                id='female-radio'
                            />
                            <label className=" align-top" htmlFor="female-radio">Female</label>
                            <input
                                className='ml-4 mr-2 h-5 w-5'
                                name='gender'
                                type='radio'
                                value='other'
                                checked={account.gender === 'other' ? true : false}
                                onChange={() => { setAccount({ ...account, gender: 'other' }) }}
                                id='other-radio'
                            />
                            <label className=" align-top" htmlFor="other-radio">Other</label>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <p id="warn" className="text-sm text-red-700">{err !== 0 && MSG[err as keyof typeof MSG]}</p>
                        <button
                            type="button"
                            onClick={GobackHandle}
                            className='bg-light-btn dark:bg-dark-btn text-light-text dark:text-dark-text text-center font-bold px-4 py-2 rounded-md w-full mb-auto mt-5'
                        >Go back</button>
                        <input
                            className=' cursor-pointer bg-light-btn dark:bg-dark-btn text-light-text dark:text-dark-text text-center font-bold px-4 py-2 rounded-md w-full mb-auto mt-5'
                            type="submit"
                            value="Sign in"
                        />
                        <div className="text-sm mt-1">
                            <span>Already have an account? </span>
                            <Link href='/sign-in' className=" text-sky-600">Sign in</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}