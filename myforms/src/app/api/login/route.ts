import { NextResponse, NextRequest } from 'next/server'
// import { serialize } from 'cookie'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    const body = await request.json()
    // console.log("request", body)
    const res = await fetch('https://127.0.0.1:7299/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(body)
    })
    if (!res.ok) {
        if (res.status === 500) {
            return NextResponse.json({ error: "server error" }, { status: 500 })
        }
        return NextResponse.json({ error: "invalid data" }, { status: 400 })
    }
    const data = await res.json()
    const { refreshToken: _, ...newData } = data;
    const response = NextResponse.json(newData, { status: 200 });
    response.cookies.set({
        name: 'refreshToken',
        value: data.refreshToken,
        httpOnly: true,
        sameSite: "strict",
        path: '/',
        expires: Date.now() + 7 * 60 * 60 * 24 * 1000
    })
    return response
}
