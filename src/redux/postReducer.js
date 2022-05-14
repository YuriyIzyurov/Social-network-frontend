const ADDPOST = "ADD-POST"
const ADDSYMBOLPOST = "ADD-SYMBOL-POST"

const postReducer = (state,action) => {
    switch (action.type) {
        case ADDPOST:
            let newPost = {
                post: state.textArea,
                id: "4",
                likesCount: 0
            }
            state.messagesData.push(newPost)
            state.textArea = ''
            break;
        case ADDSYMBOLPOST:
            state.textArea = action.newText
            break;
    }


}
export const addNewPost = () => ({type : ADDPOST})

export const addSymbolPost = (text) => ({type : ADDSYMBOLPOST, newText : text})
export default postReducer