export default {
    namespaced: true,
    state: {
        words: [
            {id: 1, image: 'https://picsum.photos/id/1000/1040/490', known: true, },
            {id: 2, image: 'https://picsum.photos/id/1001/1040/490', known: true, },
            {id: 3, image: 'https://picsum.photos/id/1002/1040/490', known: true, },
            {id: 4, image: 'https://picsum.photos/id/1003/1040/490', known: true, },
            {id: 5, image: 'https://picsum.photos/id/1004/1040/490', known: true, },
            {id: 6, image: 'https://picsum.photos/id/1005/1040/490', known: false, },
            {id: 7, image: 'https://picsum.photos/id/1006/1040/490', known: false, },
        ]
    },
    mutations: {},
    actions: {},
    getters: {
        words: state => state.words,
        knownWords: state => state.words.filter(item => item.known),
        unknownWords: state => state.words.filter(item => !item.known),
    }
}