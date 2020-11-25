import router from '@/router';
import cookie from 'js-cookie';
import axios from 'axios';
import moment from 'moment';
import { ADMIN, TEACHER, STUDENT } from '@/constants/roles';
import ErrorHelper from '@/helpers/ErrorHelper';

export default {
	namespaced: true,
	state: {
		user: null,
		loading: false,
		userIsFetching: false,
		userFetched: false
	},
	mutations: {
		SET_USER(state, user){
			state.user = user;
		},
		SET_LOADING(state, loading){
			state.loading = loading;
		},
		SET_USER_FETCHING(state, isFetching){
			state.userIsFetching = isFetching;
		},
		SET_USER_FETCHED(state, userFetched){
			state.userFetched = userFetched;
		}
	},
	actions: {
		async fetchUser({ commit }){
			if(!cookie.get('YTT_JWT'))
				return;

			commit('SET_USER_FETCHING', true);
			try {
				const res = await axios.get('/user');
				commit('SET_USER', res.data)
			} catch(err){
				console.error(err);
			}
			commit('SET_USER_FETCHING', false)
			return commit('SET_USER_FETCHED', true);
		},
		logout({ commit }){
			const clearAuthData = () => {
				cookie.remove('YTT_JWT');
				commit('SET_USER', null);
				if(router.history.current.name !== 'auth-login')
					router.push({ name: 'auth-login' });
			};

			axios.post('/auth/logout')
				.then(clearAuthData)
				.catch(clearAuthData);
		},
		login(context, credentials){
			context.commit('SET_LOADING', true);
			return new Promise((resolve, reject) => {
				axios.post('/auth/login', credentials)
					.then(res => processAuthResponse(context, res.data))
					.then(resolve)
					.catch(err => reject(ErrorHelper.getErrorWithMessage(err)))
					.then(() => context.commit('SET_LOADING', false))
			});

		},
		register(context, credentials){
			return new Promise((resolve, reject) => {
				axios.post('/auth/register', credentials)
					.then(res => processAuthResponse(context, res.data))
					.then(resolve)
					.catch(err => reject(ErrorHelper.getErrorWithMessage(err)))
			});
		},
		navigateToStartPage({ getters }){
			if(!getters.user)
				return new Error('Store/NavigateToStartPage: user is not defined');

			switch (getters.user.role_id){
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
		user: state => state.user,
		userRole: state => {
			let userRole = null;
			if(state.user){
				userRole = state.user.role_id;
			}
			return userRole;
		},
		loading: state => state.loading,
		userIsFetching: state => state.userIsFetching,
		userFetched: state => state.userFetched
	}
}

const processAuthResponse = async ({ dispatch }, { access_token, expires_at }) => {
	cookie.set('YTT_JWT', access_token, { expires: moment(expires_at).toDate() });
	await dispatch('fetchUser');
	await dispatch('navigateToStartPage');
}
