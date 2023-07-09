import SignUpForm from "../components/SignUpForm";


interface NameProps {
    propName: string;
}


export const metadata = {
    title: 'Sign up',
};

export default function SignUp({ }: NameProps) {
    return (
        <div className="flex justify-center items-center min-h-screen p-8 bg-[url('/bg-light.jpg')] dark:bg-[url('/bg-dark.jpg')] shadow-lg relative">
            <SignUpForm />
        </div>
    );
}