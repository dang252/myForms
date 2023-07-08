import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
    return (
        <div className="bg-dark-bg text-dark-text w-full flex flex-col justify-center items-center">
            <div className="flex flex-wrap justify-center gap-3">
                <Image src="/Logo.png" alt='MyForms' width={200} height={71} className="object-contain" />
                <div className="flex flex-wrap justify-center gap-3 my-1">
                    <div>
                        <p className="font-semibold">Contacts:</p>
                        <div className="text-dark-p"> Email: dagenglk252@gmail.com</div>
                        <div className="text-dark-p"> Phone: 0913159631</div>
                    </div>
                    <div className="link space-x-2 flex flex-col ">
                        <p className="font-semibold">Socials:</p>
                        <Link href='https://www.facebook.com/dageng.252/'>
                            <FontAwesomeIcon className="text-dark-p" icon={faSquareFacebook} style={{ fontSize: 30 }} />
                        </Link>
                        <Link href='https://github.com/dang252'>
                            <FontAwesomeIcon className="text-dark-p" icon={faGithubSquare} style={{ fontSize: 30 }} />
                        </Link>
                        <Link href='https://www.linkedin.com/in/nguy%E1%BB%85n-%C4%91%C4%83ng-764086252/'>
                            <FontAwesomeIcon className="text-dark-p" icon={faLinkedin} style={{ fontSize: 30 }} />
                        </Link>
                    </div>
                </div >
            </div >
            <div className="copyright border-t-2 border-dark-text w-full text-center">
                &copy; 2023 - Nguyễn Nhật Đăng
            </div>
        </div >
    )
}