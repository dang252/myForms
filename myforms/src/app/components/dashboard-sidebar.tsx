'use client';

import { usePathname } from 'next/navigation'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNewspaper, faTrashCan } from "@fortawesome/free-solid-svg-icons"

export default function DBSideBar() {
    const pathname = usePathname()
    return (
        <div className="h-full w-[300px] dark:border-r-gray-600 border-r-gray-200 border-r-[1px] flex flex-col text-xl text-light-text dark:text-dark-text font-bold">
            <Link
                href={'/dashboard/forms'}
                className={(pathname === '/dashboard/forms' ? `bg-light-sec dark:bg-dark-sec` : ``) + `w-full h-12 px-4 py-8 hover:bg-light-sec dark:hover:bg-dark-sec 
                flex items-center justify-center dark:border-t-gray-600 border-t-gray-200 border-t-[1px] rounded-lg
                transition-all hover:shadow-md hover:w-[292px] hover:m-1 `}
            >
                <FontAwesomeIcon icon={faNewspaper} />
                <span className="ml-2">My forms</span>
            </Link>
            <Link href={'/dashboard/trashcan'}
                className={(pathname === '/dashboard/trashcan' ? `bg-light-sec dark:bg-dark-sec` : ``) + `w-full h-12 px-4 py-8 hover:bg-light-sec dark:hover:bg-dark-sec 
                flex items-center justify-center dark:border-t-gray-600 border-t-gray-200 border-t-[1px] rounded-lg
                transition-all hover:shadow-md hover:w-[292px] hover:m-1`}
            >
                <FontAwesomeIcon icon={faTrashCan} />
                <span className="ml-2">Trash can</span>
            </Link>
        </div>
    );
}