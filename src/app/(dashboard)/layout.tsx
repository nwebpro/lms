import Header from './_components/Header';
import Sidebar from './_components/Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-full">
			<div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
				<Header />
			</div>
			<div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0">
				<Sidebar />
			</div>
			<main className="md:pl-56">{children}</main>
		</div>
	);
};

export default DashboardLayout;
