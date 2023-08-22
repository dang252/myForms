import { NextResponse, NextRequest } from 'next/server'
// import { serialize } from 'cookie'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
    // const body = await request.json()
    // console.log("request cookie", cookies().get("refreshToken"))
    const res = await fetch('https://127.0.0.1:7299/auth/logout', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Cookie": `refreshToken=${cookies().get("refreshToken")?.value}`
        },
        credentials: 'include',
        // body: JSON.stringify(body)
    })
    console.log("res", res)
    if (!res.ok) {
        if (res.status === 500) {
            return NextResponse.json({ error: "server error" }, { status: 500 })
        }
        return NextResponse.json({ error: "invalid data" }, { status: 400 })
    }
    // const data = await res.json()
    // const { refreshToken: _, ...newData } = data;
    // cookies().set({
    //     name: 'refreshToken',
    //     value: data.refreshToken,
    //     httpOnly: true,
    //     sameSite: "strict",
    //     path: '/',
    //     expires: Date.now() + 7 * 60 * 60 * 24 * 1000
    // })
    // console.log(data)
    return NextResponse.json({ msg: "OK" }, { status: 200 })
}
