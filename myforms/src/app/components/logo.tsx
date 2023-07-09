'use client'

// import Link from "next/link"
import Image from "next/image"
import { useTheme } from 'next-themes'

export default function Logo() {
    const { resolvedTheme } = useTheme()

    return (
        <>
            {
                (resolvedTheme === 'dark' || localStorage.theme === 'dark')
                    ? <Image src="/Logo.png" alt='MyForms' width={200} height={71} className="object-contain" />
                    : <Image src="/Logo-light.png" alt='MyForms' width={200} height={71} className="object-contain" />
            }
        </>
    )
}