import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import Logo from "./logo"

export default function Footer() {
    return (
        <div className="dark:bg-dark-bg dark:text-dark-text bg-light-bg text-light-text w-full flex flex-col justify-center items-center shadow-inner">
            <div className="flex flex-wrap justify-center gap-3">
                <Link href={"/"} className="w-fit block mt-2">
                    {/* <Image src="/Logo.png" alt='MyForms' width={200} height={71} className="object-contain" /> */}
                    <Logo />
                </Link>
                <div className="flex flex-wrap justify-center gap-3 my-1">
                    <div>
                        <p className="font-semibold">Contacts:</p>
                        <div className="dark:text-dark-p text-light-p"> Email: dagenglk252@gmail.com</div>
                        <div className="dark:text-dark-p text-light-p"> Phone: 0913159631</div>
                    </div>
                    <div className="link space-x-2 flex flex-col ">
                        <p className="font-semibold">Socials:</p>
                        <Link href='https://www.facebook.com/dageng.252/'>
                            <FontAwesomeIcon className="dark:text-dark-p text-light-p" icon={faSquareFacebook} style={{ fontSize: 30 }} />
                        </Link>
                        <Link href='https://github.com/dang252'>
                            <FontAwesomeIcon className="dark:text-dark-p text-light-p" icon={faGithubSquare} style={{ fontSize: 30 }} />
                        </Link>
                        <Link href='https://www.linkedin.com/in/nguy%E1%BB%85n-%C4%91%C4%83ng-764086252/'>
                            <FontAwesomeIcon className="dark:text-dark-p text-light-p" icon={faLinkedin} style={{ fontSize: 30 }} />
                        </Link>
                    </div>
                </div >
            </div >
            <div className="copyright border-t-2 dark:border-dark-text dark:text-dark-text border-light-text text-light-text w-full text-center">
                &copy; 2023 - Nguyễn Nhật Đăng
            </div>
        </div >
    )
}