import axios from 'axios';
import ErrorHelper from "@/helpers/ErrorHelper";

export default {
    namespaced: true,
    state: {
        loading: false,
    },
    mutations: {
        SET_LOADING(state, loading){
            state.loading = loading;
        },
    },
    actions: {
        create(context, user){

            context.commit('SET_LOADING', true);

            const formData = new FormData();
            for(let field in user){
                formData.append(field, user[field]);
            }

            return new Promise((resolve, reject) => {
                axios.post('/admin/users', formData)
                    .then(resolve)
                    .catch(err => reject(ErrorHelper.getErrorWithMessage(err)))
                    .then(() => context.commit('SET_LOADING', false))
            });
        },
        updateProfile(context, user){

            context.commit('SET_LOADING', true);

            const formData = new FormData();
            for(let field in user){
                formData.append(field, user[field]);
            }

            return new Promise((resolve, reject) => {
                axios.post('/profile', formData)
                    .then(response => {
                        context.commit('Auth/SET_USER', response.data, { root: true });
                        resolve();
                    })
                    .catch(err => reject(ErrorHelper.getErrorWithMessage(err)))
                    .then(() => context.commit('SET_LOADING', false))
            });
        },
    },
    getters: {
        loading: state => state.loading,
    },
}