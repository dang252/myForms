import DBSideBar from "../components/dashboard-sidebar";

export const metadata = {
    title: 'Dashboard',
    description: 'SEO Title',
};

export default function dashboard({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen flex mt-[71px]">
            <DBSideBar />
            {children}
        </div>
    );
}