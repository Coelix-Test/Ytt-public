import Student from '@/views/student/Student';

import lessons from './lessons';

import { STUDENT } from '@/constants/roles';
import routesExtendMeta from '@/router/routesExtendMeta';


const routes = {
	path: '/student',
	component: Student,
	name: 'teacher',
	meta: {
		auth: true,
		roleAccess: STUDENT
	},
	children: [
		lessons
	]
};

export default routesExtendMeta(routes);
