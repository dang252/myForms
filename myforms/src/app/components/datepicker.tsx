'use client';
import { YearProps } from "../interfaces/YearProps";
import { useEffect, useState, useRef } from "react";

var dateStr: string = ''

const maxDayInMonth = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export default function DatePicker({ StartYear, EndYear, handleOnChange }: YearProps) {
    var days: number[] = [];
    var months: number[] = [];
    var years: number[] = [];
    for (let i = EndYear; i >= StartYear; i--) {
        years.push(i)
    }
    for (let i = 1; i <= 12; i++) {
        months.push(i)
    }
    for (let i = 1; i <= 31; i++) {
        days.push(i)
    }

    const [date, setDate] = useState({
        day: 0,
        month: 0,
        year: 0,
    })

    useEffect(() => {
        console.log(dayRef.current?.value)
        if (date.day > maxDayInMonth[date.month] || (date.day === 29 && date.month === 2 && date.year % 4 !== 0)) {
            dayRef.current!.value = ''
        }
        if (date.day != 0 && date.month !== 0 && date.year !== 0) {
            dateStr = ('0' + String(date.day)).slice(-2) + '/' + ('0' + String(date.month)).slice(-2) + '/' + String(date.year)
            if (handleOnChange !== undefined) {
                handleOnChange(dateStr)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    const dayRef = useRef<HTMLSelectElement | null>(null)
    const monthRef = useRef<HTMLSelectElement>(null)
    const yearRef = useRef<HTMLSelectElement>(null)
    return (
        <div>
            <select
                className=" py-2 px-3 rounded-md mr-2 border-light-sec dark:border-dark-text hover:border-dark-bg border-2" required
                onChange={(e) => {
                    setDate({ ...date, day: Number(e.target.value) })
                }}
                ref={dayRef}
            >
                <option value=''>Day</option>
                {days.map(day => {
                    return (<option key={day} value={day}>{day}</option>)
                })}
            </select>
            <select
                className=" py-2 px-3 rounded-md mr-2 border-light-sec dark:border-dark-text hover:border-dark-bg border-2" required
                onChange={(e) => {
                    setDate({ ...date, month: Number(e.target.value) })
                }}
                ref={monthRef}
            >
                <option value=''>Month</option>
                {months.map(month => {
                    return (<option key={month} value={month}>{month}</option>)
                })}
            </select>
            <select
                className=" py-2 px-3 rounded-md mr-2 border-light-sec dark:border-dark-text hover:border-dark-bg border-2" required
                onChange={(e) => {
                    setDate({ ...date, year: Number(e.target.value) })
                }}
                ref={yearRef}
            >
                <option value=''>Year</option>
                {years.map(year => {
                    return (<option key={year} value={year}>{year}</option>)
                })}
            </select>
        </div>
    );
}