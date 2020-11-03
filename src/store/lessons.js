import axios from 'axios';
import ErrorHelper from '@/helpers/ErrorHelper';
import { STUDENT, TEACHER, ADMIN } from '@/constants/roles';

export default {
    namespaced: true,
    state: {
        lesson: null,
        lessonsList: null,
        loading: false
    },
    mutations: {
        SET_LOADING(state, payload){
            state.loading = payload;
        },
        SET_LESSONS_LIST(state, payload){
            state.lessonsList = payload;
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
        async fetchLessonList({ commit }, role){
            const roleMap = {
                [STUDENT]: 'student',
                [ADMIN]: 'admin',
                [TEACHER]: 'teacher',
            };
            this.commit('SET_LOADING', true);
            return new Promise((resolve, reject) => {
                axios.get(`/${roleMap[role]}/lessons`)
                  .then(response => commit('SET_LESSONS_LIST', response.data))
                  .catch(err => reject(ErrorHelper.getErrorWithMessage(err)))
                  .then(() => this.commit('SET_LOADING', false))
            })
            
        }
    },
    getters: {
        lessonsList: state => state.lessonsList,
        loading: state => state.loading
    },
}
