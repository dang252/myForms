export default function Loading() {
    return (
        <dialog id="loadind-modal"
            className="z-10 rounded-2xl w-72 h-80  backdrop:bg-gray-500 backdrop:bg-opacity-30 
            flex flex-col justify-center items-center"
        >
            <div className=" rounded-full border-t-4 border-4 border-t-light-text border-light-sec dark:border-t-dark-text dark:border-dark-sec w-14 h-14 animate-spin"></div>
        </dialog >
    )
}