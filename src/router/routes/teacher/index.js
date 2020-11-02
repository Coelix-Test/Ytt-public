import Teacher from '@/views/teacher/Teacher';

import lessons from './lessons';

import { TEACHER } from '@/constants/roles';
import routesExtendMeta from '@/router/routesExtendMeta';


const routes = {
	path: '/teacher',
	component: Teacher,
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
