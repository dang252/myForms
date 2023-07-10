'use client';
import Logo from "../components/logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faGithubSquare, faLinkedin, faGoogle } from "@fortawesome/free-brands-svg-icons"
import DatePicker from "./datepicker";
import { UserAccount } from "../interfaces/UserAccount";
import { useState } from "react";

function ContinueHandle() {
    const form = document.getElementById('sign-up-form')
    form?.classList.add('translate-x-[-376px]')
}

function GobackHandle() {
    const form = document.getElementById('sign-up-form')
    form?.classList.remove('translate-x-[-376px]')
}


export default function SignUpForm() {
    const [account, setAccount] = useState<UserAccount>(
        {
            username: '',
            email: '',
            password: '',
            repassword: '',
            dob: '',
            phoneNumber: '',
            gender: ''
        }
    )
    return (
        <div className=" w-[400px] h-[600px] bg-light-bg text-light-p  dark:bg-dark-bg dark:text-dark-p rounded-lg p-4 flex flex-col flex-wrap overflow-hidden relative">
            <Logo />
            <h1 className="text-light-text dark:text-dark-text font-bold text-xl  px-4">Sign up</h1>
            <form id='sign-up-form' className="px-4 h-[468px] flex transition-translate duration-500">
                <div className="w-[336px] flex flex-col">
                    <div className="mt-2">
                        <label>Email:</label>
                        <input
                            className="rounded-md border-2 w-full p-2"
                            type="text"
                            value={account.email}
                            onChange={(e) => {
                                setAccount({ ...account, email: e.target.value })
                            }}
                            required
                        />
                        <p id="email-warn" className="text-sm text-red-700"></p>
                    </div>
                    <div className="mt-2">
                        <label>Password:</label>
                        <input
                            className="rounded-md border-2 w-full p-2"
                            type="password"
                            value={account.password}
                            onChange={(e) => {
                                setAccount({ ...account, password: e.target.value })
                            }}
                            required
                        />
                        <p id="password-warn" className="text-sm text-red-700"></p>
                    </div>
                    <div className="mt-2">
                        <label>Confirm password:</label>
                        <input
                            className="rounded-md border-2 w-full p-2"
                            type="password"
                            value={account.repassword}
                            onChange={(e) => {
                                setAccount({ ...account, repassword: e.target.value })
                            }}
                            required
                        />
                        <p id="confirm-password-warn" className="text-sm text-red-700"></p>
                    </div>
                    <div className="mt-auto">
                        <p className=" before:content-['-'] after:content-['-'] text-center ">or</p>
                        <div className="flex items-center justify-center gap-3 text-4xl">
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
                        <button
                            onClick={ContinueHandle}
                            className='bg-light-btn dark:bg-dark-btn text-light-text dark:text-dark-text text-center font-bold px-4 py-2 rounded-md w-full mb-auto mt-5'
                        >Continue</button>
                        <div className="text-sm mt-1">
                            <span>Already have an account? </span>
                            <Link href='/sign-in' className=" text-sky-600">Sign in</Link>
                        </div>
                    </div>
                </div>
                <div className="w-[336px] ml-10 flex flex-col">
                    <div className="mt-2">
                        <label>Username:</label>
                        <input
                            className="rounded-md border-2 w-full p-2"
                            type="text"
                            value={account.username}
                            onChange={(e) => {
                                setAccount({ ...account, username: e.target.value })
                            }}
                            required
                        />
                        <p id="username-warn" className="text-sm text-red-700"></p>
                    </div>
                    <div className="mt-2">
                        <label>Phone number:</label>
                        <input
                            className="rounded-md border-2 w-full p-2"
                            type="text"
                            value={account.phoneNumber}
                            onChange={(e) => {
                                setAccount({ ...account, phoneNumber: e.target.value })
                            }}
                            required
                        />
                        <p id="username-warn" className="text-sm text-red-700"></p>
                    </div>
                    <div className="mt-2">
                        <label>Date of birth:</label>
                        {/* <input
                            className="rounded-md border-2 w-full p-2"
                            type=""
                            required
                        /> */}
                        <DatePicker EndYear={2023} StartYear={1970} />
                        <p id="email-warn" className="text-sm text-red-700"></p>
                    </div>
                    <div className="mt-2">
                        <label>Gender:</label>
                        <div className="leading-5 mt-2">
                            <input
                                className='mr-2 h-5 w-5'
                                name='gender'
                                type='radio'
                                value='male'
                                defaultChecked
                            />
                            <label className=" align-top">Male</label>
                            <input
                                className='ml-4 mr-2 h-5 w-5'
                                name='gender'
                                type='radio'
                                value='female'
                                defaultChecked
                            />
                            <label className=" align-top">Female</label>
                            <input
                                className='ml-4 mr-2 h-5 w-5'
                                name='gender'
                                type='radio'
                                value='Other'
                                defaultChecked
                            />
                            <label className=" align-top">Other</label>
                        </div>
                        <p id="passwor-warn" className="text-sm text-red-700"></p>
                    </div>
                    <div className="mt-auto">
                        <button
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