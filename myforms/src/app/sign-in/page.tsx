import SignInForm from "../components/SignInForm"

export const metadata = {
    title: 'Sign in',
}

export default function SignIn() {
    return (
        <div className="flex justify-center items-center min-h-screen p-8 bg-[url('/bg-light.jpg')] dark:bg-[url('/bg-dark.jpg')] shadow-lg relative">
            <SignInForm />
        </div>
    );
}