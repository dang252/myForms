'use client';
import { useEffect, useRef, useCallback } from "react";
import { useAppSelector } from "../redux/hook";


interface NameProps {
    propName: string;
}


export default function LoadingModal() {
    const modal = useRef<HTMLDialogElement>(null);
    const isLoading = useAppSelector((state) => state.LoadingReducer.isLoading)
    useEffect(() => {
        if (isLoading) {
            // modal.current?.close()
            modal.current?.showModal();
        }
        else {
            modal.current?.close();
        }
    }, [isLoading])


    useEffect(() => {
        let modalRef: HTMLDialogElement | undefined;

        if (modal.current) {
            modalRef = modal.current;
        }

        modalRef?.addEventListener('cancel', (event: any) => {
            event.preventDefault();
        });

        return () => {
            modalRef?.removeEventListener('cancel', (event: any) => {
                event.preventDefault();
            });
        };
    }, []);

    return (
        <dialog id="loadind-modal"
            ref={modal}
            className="z-10 rounded-2xl w-72 h-80  backdrop:bg-gray-500 backdrop:bg-opacity-30 
            open:flex flex-col justify-center items-center hidden"
        >
            <div className=" rounded-full border-t-4 border-4 border-t-light-text border-light-sec dark:border-t-dark-text dark:border-dark-sec w-14 h-14 animate-spin"></div>
            <p>Please wait...</p>
        </dialog >
    );
}