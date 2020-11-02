import axios from 'axios';

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
        }
    },
    getters: {},
}