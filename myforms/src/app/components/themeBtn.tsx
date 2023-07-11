'use client'

import { useTheme } from 'next-themes'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from 'react'

export default function ThemeBtn() {
    const { resolvedTheme, setTheme } = useTheme()

    function handleChange() {
        const btn = document.getElementsByClassName("theme-btn")[0]
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }
    // console.log('theme', theme)
    // console.log('resolved theme', resolvedTheme)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div onClick={handleChange} className={'theme-btn transition-transform mx-auto text-center ' + (resolvedTheme === 'dark' ? 'translate-y-[22px]' : 'translate-y-[-18px]')}>
            <FontAwesomeIcon icon={faMoon} className='text-dark-btn w-8 h-8 text-3xl' />
            <FontAwesomeIcon icon={faSun} className='text-light-btn w-8 mt-1 h-8 text-3xl' />
        </div>
    );
}