import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store';

Vue.use(VueRouter);

import routes from './routes';



const router = new VueRouter({ routes });


router.beforeEach(async (to, from, next) => {
	const { auth, roleAccess, forUnauthorized } = to.meta;
	console.log('beforeEach[to]: ', to);
	console.log('beforeEach[from]: ', from);
	if(!auth)
		return next();
	
	const user = store.getters['Auth/user']
	console.log('beforeEach[user]: ', user);
	
	if(user && forUnauthorized)
		return await store.dispatch('Auth/navigateToStartPage');
	
	if(!user)
		return next({ name: 'auth-login' });
	
	const access = roleAccess ? Array.isArray(roleAccess) ? roleAccess : [roleAccess] : []
	console.log('beforeEach[access]: ', access);
	
	if(!access.includes(user.role_id))
		return next(from);
	
	
		
	return next();
});


export default router;

