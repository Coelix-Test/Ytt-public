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
        async createLesson(context, lesson){

            // context.commit();

            const lessonData = new FormData();
            for(let field in lesson){
                lessonData.append(field, lesson[field]);
            }

            axios.post('/admin/lessons', lessonData)
                .then(response => {
                    console.log(response);
                })
                .catch(console.error);
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
