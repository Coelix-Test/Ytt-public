import Teacher from '@/views/teacher/Teacher';

import lessons from './lessons';
import students from './students';

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
		lessons,
		students,
	]
};

export default routesExtendMeta(routes);
