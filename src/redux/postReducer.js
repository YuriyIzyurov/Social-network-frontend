const ADDPOST = "ADD-POST"
const ADDSYMBOLPOST = "ADD-SYMBOL-POST"

let initialState = {
    messagesData : [
            {post: "Hi are you?", id: "1",likesCount: '5'},
            {post: "Whats is going on?", id: "2",likesCount: '22'},
            {post: "Nice 2 meet u", id: "3",likesCount: '14'}],
        textArea : ''
}
const postReducer = (state = initialState,action) => {


    switch (action.type) {
        case ADDPOST:
            return {
                ...state,
                messagesData : [...state.messagesData, {post: state.textArea, id: "4", likesCount: 0}],
                textArea: ''
            }

        case ADDSYMBOLPOST:
            return {
                ...state,
                textArea: action.newText
            }
        default:
            return state
    }


}
export const addNewPost = () => ({type : ADDPOST})

export const addSymbolPost = (text) => ({type : ADDSYMBOLPOST, newText : text})
export default postReducer