import axios from 'axios';
import ErrorHelper from "@/helpers/ErrorHelper";
import { STUDENT, TEACHER, ADMIN, ROLE_MAP } from '@/constants/roles';

export default {
    namespaced: true,
    state: {
        loading: false,
    },
    mutations: {

    },
    actions: {
        charge(context, { role, userId, amount}){

            context.commit('SET_LOADING', true)

            return new Promise((resolve, reject) => {
               axios.post(`/${ROLE_MAP[role]}/coins`, { user_id: userId, amount: amount})
                   .then(resolve)
                   .catch(err => reject(ErrorHelper.getErrorWithMessage(err)))
                   .then(() => context.commit('SET_LOADING', false))
            });
        },
    },
    getters: {}
}