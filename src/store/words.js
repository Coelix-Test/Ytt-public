import axios from "axios";
import {ROLE_MAP} from "@/constants/roles";
import ErrorHelper from "@/helpers/ErrorHelper";

const getDefaultState = () => ({
    words: [],
    wordsToggled: [],
    wordsShuffled: [],
    shuffleTopEdge: null,
    shuffleBottomEdge: null,
    lastWord: null,
    loading: false,
});

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
        RESET_TOGGLED_WORDS(state){
          state.wordsToggled = [];
        },
        SET_SHUFFLE_TOP_EDGE(state, payload){
            state.shuffleTopEdge = payload;
            state.wordsShuffled = [];
        },
        SET_SHUFFLE_BOTTOM_EDGE(state, payload){
            state.shuffleBottomEdge = payload;
            state.wordsShuffled = [];
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
        },
        SHUFFLE(state){
            let words = state.words.slice(state.shuffleBottomEdge, state.shuffleTopEdge + 1);
            words.sort(() => Math.random() - 0.5);
            state.wordsShuffled = words;
        },
        RESET(state){
            Object.assign(state, getDefaultState());
        }
    },
    actions: {
        updateStudentsWords({ commit, getters }, { studentId, lessonId, isLessonCheck }){

            let url = `/teacher/students/${studentId}/lessons/${lessonId}`;
            if(isLessonCheck){
                url += '/words';
            }
            commit('SET_LOADING', true);
            return new Promise((resolve, reject) => {
                axios.post(url, {
                    words: getters.wordsToggled,
                    last_word: getters.lastWord,
                })
                .then(resolve)
                .catch(err => reject(ErrorHelper.getErrorWithMessage(err)))
                .then(() => {
                    commit('RESET_TOGGLED_WORDS');
                    commit('SET_LOADING', false);
                });
            });
        }
    },
    getters: {
        loading: state => state.loading,
        words: state => state.words,
        wordsShuffled: state => state.wordsShuffled,
        shuffleBottomEdge: state => state.shuffleBottomEdge,
        shuffleTopEdge: state => state.shuffleTopEdge,
        knownWords: state => state.words.filter(item => item.isKnown),
        unknownWords: state => state.words.filter(item => !item.isKnown),
        wordsToggled: state => state.wordsToggled,
        lastWord: state => state.lastWord,
    }
}