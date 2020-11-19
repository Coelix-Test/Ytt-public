import Student from '@/views/student/Student';

import lessons from './lessons';
import settings from "./settings";

import { STUDENT } from '@/constants/roles';
import routesExtendMeta from '@/router/routesExtendMeta';


const routes = {
	path: '/student',
	component: Student,
	name: 'student',
	meta: {
		auth: true,
		roleAccess: STUDENT
	},
	children: [
		lessons,
		settings,
	]
};

export default routesExtendMeta(routes);
