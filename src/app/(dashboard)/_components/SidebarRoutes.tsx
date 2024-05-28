'use client';

import { Layout, User } from 'lucide-react';
import SidebarItem from './SidebarItem';

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
const SidebarRoutes = () => {
	return (
		<div className="flex flex-col w-full">
			{guestRoutes.map((route) => (
				<SidebarItem
					key={route.url}
					icon={route.icon}
					label={route.label}
					url={route.url}
				/>
			))}
		</div>
	);
};

export default SidebarRoutes;
