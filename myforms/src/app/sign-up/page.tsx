import SignUpForm from "../components/signUpForm";

export const metadata = {
    title: 'Sign up',
};

export default function SignUp() {
    return (
        <div className="flex justify-center items-center min-h-screen p-8 bg-[url('/bg-light-2.jpg')] dark:bg-[url('/bg-dark-2.jpg')] bg-cover shadow-lg relative">
            <SignUpForm />
        </div>
    );
}