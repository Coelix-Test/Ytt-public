import axios from 'axios';
import ErrorHelper from "@/helpers/ErrorHelper";
import { STUDENT, TEACHER, ADMIN, ROLE_MAP } from '@/constants/roles';

export default {
    namespaced: true,
    state: {
        loading: false,
        studentsList: null,
        student: null,
    },
    mutations: {
        SET_LOADING(state, payload) {
            state.loading = payload;
        },
        SET_LESSONS_LIST(state, payload){
            state.studentsList = payload;
        },
        SET_STUDENT(state, payload){
          state.student = payload;
        },
    },
    actions: {
        fetchStudentsList(context, role){
            context.commit('SET_LOADING', true);

            return new Promise((resolve, reject) => {
                axios.get(`/${ROLE_MAP[role]}/students`)
                    .then(response => {
                        console.log(response.data);
                        context.commit('SET_LESSONS_LIST', response.data);
                    })
                    .catch(err => reject(ErrorHelper.getErrorWithMessage(err)))
                    .then(() => context.commit('SET_LOADING', false))
            })
        },

        fetchStudent({ commit }, {id, role}){
            commit('SET_LOADING', true);

            return new Promise((resolve, reject) => {
                axios.get(`/${ROLE_MAP[role]}/students/${id}`)
                    .then(response => {
                        let student = response.data;
                        if(student.lessons && student.lessons.length){
                            commit('Lessons/SET_LESSONS_LIST', response.data.lessons, { root: true} );
                            delete student.lessons;
                        }
                        commit('SET_STUDENT', student);

                    })
                    .catch(err => reject(ErrorHelper.getErrorWithMessage(err)))
                    .then(() => commit('SET_LOADING', false))
            })
        }
    },
    getters: {
        loading: state => state.loading,
        studentsList: state => state.studentsList,
        student: state => state.student,
    },
}