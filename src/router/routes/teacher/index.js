import Admin from '@/views/admin/Admin';

import lessons from './lessons';

import { TEACHER } from '@/constants/roles';
import routesExtendMeta from '@/router/routesExtendMeta';


const routes = {
	path: '/teacher',
	component: Admin,
	name: 'teacher',
	meta: {
		auth: true,
		roleAccess: TEACHER
	},
	children: [
		lessons
	]
};

export default routesExtendMeta(routes);
