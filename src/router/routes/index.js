import Index from '@/views/Index';
import auth from './auth';
import admin from './admin';
import teacher from './teacher';
import student from './student';

export default [
	{
		path: '/',
			component: Index,
		name: 'index',
		redirect: { name: 'auth-login'},
	},
	auth,
	admin,
	teacher,
	student
]
