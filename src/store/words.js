import axios from "axios";
import {ROLE_MAP} from "@/constants/roles";
import ErrorHelper from "@/helpers/ErrorHelper";

export default {
    namespaced: true,
    state: {
        words: [],
        wordsToggled: [],
        lastWord: null,
        loading: false,
    },
    mutations: {
        SET_WORDS(state, payload){
            state.words = payload;
        },
        TOGGLE_WORD(state, wordId){
            state.words = state.words.map((item) => {
                if(item.id === wordId)
                    item.isKnown = !item.isKnown
                return item;

            });
            if(state.wordsToggled.indexOf(wordId) !== -1){
                state.wordsToggled = state.wordsToggled.filter(item => item !== wordId);
            }
            else{
                state.wordsToggled.push(wordId);
            }
        },
        SET_LOADING(state, payload){
            state.loading = payload;
        },
        SET_LAST_WORD(state, payload){
            state.lastWord = payload;
        }
    },
    actions: {
        updateStudentsWords({ commit, getters }, { studentId, lessonId }){

            commit('SET_LOADING', true);
            return new Promise((resolve, reject) => {
                axios.post(`/teacher/students/${studentId}/lessons/${lessonId}/words`, {
                    words: getters.wordsToggled,
                    last_word: getters.lastWord,
                })
                .then(resolve)
                .catch(err => reject(ErrorHelper.getErrorWithMessage(err)))
                .then(() => {
                    getters.wordsToggled.forEach((word) => {
                        commit('TOGGLE_WORD', word);
                    })
                    commit('SET_LOADING', false);
                });
            });
        }
    },
    getters: {
        loading: state => state.loading,
        words: state => state.words,
        knownWords: state => state.words.filter(item => item.isKnown),
        unknownWords: state => state.words.filter(item => !item.isKnown),
        wordsToggled: state => state.wordsToggled,
        lastWord: state => state.lastWord,
    }
}