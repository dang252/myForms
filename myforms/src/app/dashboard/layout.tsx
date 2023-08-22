import DBSideBar from "../components/dashboardSidebar";

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
        <div className="h-screen flex relative">
            <DBSideBar />
            <div className="lg:ml-0 ml-[80px]">
                {children}
            </div>
        </div>
    );
}