import SignInForm from "../components/signInForm"

export const metadata = {
    title: 'Sign in',
}

export default function SignIn() {
    return (
        <div className="flex justify-center items-center min-h-screen p-8 bg-[url('/bg-light.jpg')] dark:bg-[url('/bg-dark.jpg')] bg-cover shadow-lg relative">
            <SignInForm />
        </div>
    );
}