"use server"
import { loginData } from "../interfaces/loginData";

export default async function signIn(account: loginData) {
    console.log("sign in")
    const res = await fetch('https://localhost:7299/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(account)
    })
    console.log(res)
    return res
}