'use client';
import Logo from "../components/logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faGithubSquare, faLinkedin, faGoogle } from "@fortawesome/free-brands-svg-icons"

// const form = document.getElementById('sign-up-form')

function ContinueHandle() {
    const form = document.getElementById('sign-up-form')
    form?.classList.add('translate-x-[-376px]')
}

function GobackHandle() {
    const form = document.getElementById('sign-up-form')
    form?.classList.remove('translate-x-[-376px]')
}

export default function SignUpForm() {
    return (
        <div className=" w-[400px] h-[600px] bg-light-bg text-light-p  dark:bg-dark-bg dark:text-dark-p rounded-lg p-4 flex flex-col flex-wrap overflow-hidden">
            <Logo />
            <form id='sign-up-form' className="p-4 flex transition-translate duration-500">
                <div className="w-[336px]">
                    <h1 className="text-light-text dark:text-dark-text font-bold text-xl">Sign up</h1>
                    <br />
                    <div>
                        <label>Email or Username:</label>
                        <input
                            className="rounded-md border-2 w-full p-2"
                            type="text"
                            required
                        />
                        <p id="email-warn" className="text-sm text-red-700"></p>
                    </div>
                    <div className="mt-2">
                        <label>Password:</label>
                        <input
                            className="rounded-md border-2 w-full p-2"
                            type="password"
                            required
                        />
                        <p id="password-warn" className="text-sm text-red-700"></p>
                    </div>
                    <div className="mt-2">
                        <label>Confirm password:</label>
                        <input
                            className="rounded-md border-2 w-full p-2"
                            type="password"
                            required
                        />
                        <p id="confirm-password-warn" className="text-sm text-red-700"></p>
                    </div>
                    <div className="mt-2">
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
                    <button
                        onClick={ContinueHandle}
                        className='bg-light-btn dark:bg-dark-btn text-light-text dark:text-dark-text text-center font-bold px-4 py-2 rounded-md w-full mb-auto mt-5'
                    >Continue</button>
                    <div className="text-sm mt-1">
                        <span>Already have an account? </span>
                        <Link href='/sign-in' className=" text-sky-600">Sign in</Link>
                    </div>
                </div>
                <div className="w-[336px] ml-10">
                    <div>
                        <label>Email or Username:</label>
                        <input
                            className="rounded-md border-2 w-full p-2"
                            type="text"
                            required
                        />
                        <p id="email-warn" className="text-sm text-red-700"></p>
                    </div>
                    <div className="mt-2">
                        <label>Password:</label>
                        <input
                            className="rounded-md border-2 w-full p-2"
                            type="password"
                            required
                        />
                        <p id="passwor-warn" className="text-sm text-red-700"></p>
                    </div>
                    <div className="mt-2">
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
                    <button
                        onClick={GobackHandle}
                        className='bg-light-btn dark:bg-dark-btn text-light-text dark:text-dark-text text-center font-bold px-4 py-2 rounded-md w-full mb-auto mt-5'
                    >Go back</button>
                    <input
                        className='bg-light-btn dark:bg-dark-btn text-light-text dark:text-dark-text text-center font-bold px-4 py-2 rounded-md w-full mb-auto mt-5'
                        type="submit"
                        value="Sign in"
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