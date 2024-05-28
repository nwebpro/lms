'use client';

import { BarChart, Layout, List, User } from 'lucide-react';
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';

const guestRoutes = [
	{
		icon: Layout,
		label: 'Dashboard',
		url: '/',
	},
	{
		icon: User,
		label: 'Browse',
		url: '/search',
	},
];

const teacherRoutes = [
	{
		icon: List,
		label: 'Courses',
		url: '/teacher/courses',
	},
	{
		icon: BarChart,
		label: 'Analytics',
		url: '/teacher/analytics',
	},
];

const SidebarRoutes = () => {
	const pathname = usePathname();
	const isTeacherPage = pathname?.includes('/teacher');
	const routes = isTeacherPage ? teacherRoutes : guestRoutes;

	return (
		<div className="flex flex-col w-full">
			{routes?.map((route) => (
				<SidebarItem
					key={route?.url}
					icon={route?.icon}
					label={route?.label}
					url={route?.url}
				/>
			))}
		</div>
	);
};

export default SidebarRoutes;
