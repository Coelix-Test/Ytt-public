import axios from 'axios';
import ErrorHelper from '@/helpers/ErrorHelper';
import { STUDENT, TEACHER, ADMIN, ROLE_MAP } from '@/constants/roles';

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
        SET_LESSON(state, payload){
            state.lessons = payload;
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

        fetchLesson({ commit }, { role, id}){

            commit('SET_LOADING', true);
            return new Promise((resolve, reject) => {
                axios.get(`/${ROLE_MAP[role]}/lessons/${id}`)
                    .then(response => {

                        commit('SET_LESSON', response.data)
                    })
                    .catch(err => reject(ErrorHelper.getErrorWithMessage(err)))
                    .then(() => commit('SET_LOADING', false))
            })

        },

        fetchLessonList({ commit }, role){

            commit('SET_LOADING', true);
            return new Promise((resolve, reject) => {
                axios.get(`/${ROLE_MAP[role]}/lessons`)
                  .then(response => commit('SET_LESSONS_LIST', response.data))
                  .catch(err => reject(ErrorHelper.getErrorWithMessage(err)))
                  .then(() => commit('SET_LOADING', false))
            })
            
        },

        fetchStudentsLessonsByTeacher(context, id){
            context.commit('SET_LOADING', true);

            return new Promise((resolve, reject) => {
                axios.get(`/teacher/students/${id}`)
                    .then((response) => {
                        console.log(response.data);
                        resolve();
                    })
                    .catch(err => reject(ErrorHelper.getErrorWithMessage(err)))
                    .then(() => context.commit('SET_LOADING', false));
            });
        },

        sendRecord(context, { lessonId, ...answer }){
            context.commit('SET_LOADING', true);

            const postData = new FormData();
            for(let field in answer){
                postData.append(field, answer[field]);
            }

            return new Promise((resolve, reject) => {
                axios.post(`/student/lessons/${lessonId}/record`, postData)
                    .then((response) => {
                        console.log(response.data);
                        resolve();
                    })
                    .catch(err => reject(ErrorHelper.getErrorWithMessage(err)))
                    .then(() => context.commit('SET_LOADING', false));
            });
        },
    },
    getters: {
        lessonsList: state => state.lessonsList,
        loading: state => state.loading,
        lesson: state => state.lesson,
    },
}
