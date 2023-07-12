'use client';

import { usePathname } from 'next/navigation'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNewspaper, faTrashCan } from "@fortawesome/free-solid-svg-icons"

export default function DBSideBar() {
    const pathname = usePathname()
    return (
        <div className="group h-full lg:w-[300px] lg:hover:w-[300px] w-[80px] hover:w-[200px]
         dark:border-r-gray-600 border-r-gray-200 border-r-[1px]
         flex flex-col lg:text-lg text-sm text-light-text dark:text-dark-text font-bold absolute lg:static">
            <Link
                href={'/dashboard/forms'}
                className={(pathname === '/dashboard/forms' ? `bg-light-sec dark:bg-dark-sec` : ``) +
                    ` w-[72px] group-hover:w-[192px] lg:w-[292px] lg:group-hover:w-[292px] mx-1 mt-0.5 h-12 px-4 py-8 hover:bg-light-sec dark:hover:bg-dark-sec 
                flex items-center justify-center dark:border-t-gray-600 border-t-gray-200 border-t-[1px] rounded-lg
                transition-all hover:shadow-md hover:m-0 hover:h-16 hover:z-10 hover:text-light-btn dark:hover:text-dark-btn`}
            >
                <FontAwesomeIcon icon={faNewspaper} className='text-lg' />
                <span className="ml-2 hidden group-hover:inline-block lg:inline-block transition-none">My forms</span>
            </Link>
            <Link href={'/dashboard/trashcan'}
                className={(pathname === '/dashboard/trashcan' ? `bg-light-sec dark:bg-dark-sec` : ``) +
                    ` w-[72px] group-hover:w-[192px] lg:w-[292px] lg:group-hover:w-[292px] mx-1 mt-0.5 h-12 px-4 py-8 hover:bg-light-sec dark:hover:bg-dark-sec 
                flex items-center justify-center dark:border-t-gray-600 border-t-gray-200 border-t-[1px] rounded-lg
                transition-all hover:shadow-md hover:m-0 hover:h-16 hover:z-10 hover:text-light-btn dark:hover:text-dark-btn`}
            >
                <FontAwesomeIcon icon={faTrashCan} className='text-lg' />
                <span className="ml-2 hidden group-hover:inline-block lg:inline-block transition-none ">Trash can</span>
            </Link>
        </div>
    );
}