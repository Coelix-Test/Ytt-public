import AuthView from '@/views/auth/AuthView';
import AuthLogin from '@/views/auth/AuthLogin';
import AuthRegister from '@/views/auth/AuthRegister';
import AuthResetPassword from '@/views/auth/AuthResetPassword';

import routesExtendMeta from '@/router/routesExtendMeta';

const auth = {
	path: '/auth',
	component: AuthView,
	name: 'auth',
	meta: {
		forUnauthorized: true
	},
	children: [
		{
			path: 'login',
			component: AuthLogin,
			name: 'auth-login'
		},
		{
			path: 'register',
			component: AuthRegister,
			name: 'auth-register',
		},
		{
			path: 'reset-password/:token',
			component: AuthResetPassword,
			name: 'auth-reset-password',
		},
	]
};

export default routesExtendMeta(auth);


