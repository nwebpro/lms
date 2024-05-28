import HeaderRoutes from '@/components/HeaderRoutes';
import MobileSidebar from './MobileSidebar';

const Header = () => {
	return (
		<div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
			<MobileSidebar />
			<HeaderRoutes />
		</div>
	);
};

export default Header;
