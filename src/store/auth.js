import { AuthAPI } from '@/api';
import router from '@/router';
import cookie from 'js-cookie';
import axios from 'axios';
import moment from 'moment';
import { ADMIN, TEACHER, STUDENT } from '@/constants/roles';

export default {
	namespaced: true,
	state: {
		user: null,
		loading: false
	},
	mutations: {
		SET_USER(state, user){
			state.user = user;
		},
		SET_LOADING(state, loading){
			state.loading = loading;
		}
	},
	actions: {
		async fetchUser({ commit }){
			commit('SET_LOADING', true);
			try {
				const res = await axios.get('/user');
				commit('SET_USER', res.data)
			} catch(err){
				console.error(err);
			}
			commit('SET_LOADING', false);
		},
		logout({ commit }){
			axios.post('/auth/logout')
				.then(() => {
					cookie.remove('YTT_JWT');
					commit('SET_USER', null);
					router.push({ name: 'auth-login' });
				})
				.catch(console.error);
		},
		login(context, credentials){
			axios.post('/auth/login', credentials)
				.then(res => processAuthResponse(context, res.data))
				.catch(console.error);
		},
		register(context, credentials){
			axios.post('/auth/register', credentials)
				.then(res => processAuthResponse(context, res.data))
				.catch(console.error);
		},
		navigateToStartPage({ getters }){
			if(!getters.user)
				return new Error('Store/NavigateToStartPage: user is not defined');
			
			console.log('navigateToStartPage: ', getters.user);
			switch (getters.user.role){
				case ADMIN:
					return router.push({ name: 'admin-lessons-all' });
				case TEACHER:
					return router.push({ name: 'teacher-lessons-all' });
				case STUDENT:
					return router.push({ name: 'student-lessons-all' });
			}
		}
	},
	getters: {
		user(state){
			return state.user;
		}
	}
}

const processAuthResponse = async ({ dispatch }, { access_token, expires_at }) => {
	cookie.set('YTT_JWT', access_token, { expires: moment(expires_at).toDate() });
	await dispatch('fetchUser');
	await dispatch('navigateToStartPage');
}
