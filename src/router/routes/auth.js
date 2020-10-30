import AuthView from '@/views/auth/AuthView';
import AuthLogin from '@/views/auth/AuthLogin';
import AuthRegister from '@/views/auth/AuthRegister';

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
			name: 'auth-login',
		},
		{
			path: 'register',
			component: AuthRegister,
			name: 'auth-register',
		},
	]
};

export default routesExtendMeta(auth);


