import Admin from '@/views/admin/Admin';

import lessons from './lessons';
import users from './users';
import settings from './settings';

import { ADMIN } from '@/constants/roles';
import routesExtendMeta from '@/router/routesExtendMeta';

const routes = {
	path: '/admin',
	component: Admin,
	name: 'admin',
	meta: {
		auth: true,
		roleAccess: ADMIN
	},
	children: [
		lessons,
		users,
		settings,
	]
};


export default routesExtendMeta(routes);
