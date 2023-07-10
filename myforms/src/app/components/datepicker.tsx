'use client';
import { YearProps } from "../interfaces/YearProps";

export default function DatePicker({ StartYear, EndYear }: YearProps) {
    var days: string[] = [];
    var months: string[] = [];
    var years: string[] = [];
    for (let i = EndYear; i >= StartYear; i--) {
        years.push(String(i))
    }
    for (let i = 1; i <= 12; i++) {
        months.push(('0' + String(i)).slice(-2))
    }
    for (let i = 1; i <= 31; i++) {
        days.push(('0' + String(i)).slice(-2))
    }
    return (
        <div>
            <select className=" py-2 px-3 rounded-md mr-2 border-light-sec dark:border-dark-text hover:border-dark-bg border-2" required>
                <option value=''>Day</option>
                {days.map(day => {
                    return (<option key={day} value={day}>{day}</option>)
                })}
            </select>
            <select className=" py-2 px-3 rounded-md mr-2 border-light-sec dark:border-dark-text hover:border-dark-bg border-2" required>
                <option value=''>Month</option>
                {months.map(month => {
                    return (<option key={month} value={month}>{month}</option>)
                })}
            </select>
            <select className=" py-2 px-3 rounded-md mr-2 border-light-sec dark:border-dark-text hover:border-dark-bg border-2" required>
                <option value=''>Year</option>
                {years.map(year => {
                    return (<option key={year} value={year}>{year}</option>)
                })}
            </select>
        </div>
    );
}