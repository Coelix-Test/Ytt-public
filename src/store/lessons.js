import axios from 'axios';
import ErrorHelper from "@/helpers/ErrorHelper";

export default {
    namespaced: true,
    state: {
        lesson: null,
        lessonsList: null,
        loading: false
    },
    mutations: {
        SET_LOADING(state, loading){
            state.loading = loading;
        },
    },
    actions: {
        createLesson(context, lesson){

            context.commit('SET_LOADING', true);

            const lessonData = new FormData();
            for(let field in lesson){
                lessonData.append(field, lesson[field]);
            }

            return new Promise((resolve, reject) => {
                axios.post('/admin/lessons', lessonData)
                    .then(resolve)
                    .catch(err => reject(ErrorHelper.getErrorWithMessage(err)))
                    .then(() => context.commit('SET_LOADING', false))
            });
        },
    },
    getters: {
        loading: state => state.loading,
    },
}