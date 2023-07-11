"use client";

// import Link from "next/link"
import Image from "next/image"
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
export default function Logo() {
    const { resolvedTheme } = useTheme()
    // const [isDark, setIsDark] = useState(true)
    // useEffect(() => {
    //     setIsDark((resolvedTheme === 'dark' || localStorage.theme === 'dark') ? true : false)
    // }, [resolvedTheme])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }
    return (
        <>
            {
                (resolvedTheme === 'dark')
                    ? <Image src="/Logo.png" alt='MyForms' width={200} height={71} className="object-contain" />
                    : <Image src="/Logo-light.png" alt='MyForms' width={200} height={71} className="object-contain" />
            }
        </>
    )
}