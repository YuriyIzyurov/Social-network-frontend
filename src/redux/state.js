
let store = {
    _rerenderAllTree() {
        console.log("zaglushka")},
    _state : {
        dialog: {privateMessageData : [
                {message: "Hi are you?", id: "1"},
                {message: "Whats is going on?", id: "2"},
                {message: "Nice 2 meet u", id: "3"}],
            textAreaMess : '',
            DialogData : [
                {name: "Anton", id: "1", src:'https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg'},
                {name: "Vasya", id: "2", src:'https://cspromogame.ru//storage/upload_images/avatars/1299.jpg'},
                {name: "Egor", id: "3", src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpyQ3Ez7fGNDmuULcJxaGc3CxZ5ohwAoFeGQ&usqp=CAU'},
                {name: "Anna", id: "4", src:'https://klike.net/uploads/posts/2019-03/1551511784_4.jpg'},
                {name: "Dmitriy", id: "5", src:'http://pm1.narvii.com/6889/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_uhq.jpg'}]},
        post:  {messagesData : [
                {post: "Hi are you?", id: "1",likesCount: '5'},
                {post: "Whats is going on?", id: "2",likesCount: '22'},
                {post: "Nice 2 meet u", id: "3",likesCount: '14'}],
            textArea : ''},
        sidebar: [
            {name: "Sebastian", id: "6", src:'https://vsekidki.ru/uploads/posts/2016-08/1470735121_lecdaa3axdc.jpg'},
            {name: "Venedict", id: "7", src:'https://semantica.in/wp-content/uploads/2018/08/av-427845-1.png'},
            {name: "Ameliya", id: "8", src:'https://trikky.ru/wp-content/blogs.dir/1/files/2017/04/2a57bfab998b8c853269f4e700e30f5b.jpg'}]},
    getState(){
        return this._state
    },
    addPost() {
        let newPost = {
            post: this._state.post.textArea,
            id: "4",
            likesCount: 0
        }
        this._state.post.messagesData.push(newPost)
        this._state.post.textArea = ''
        this._rerenderAllTree()
    },
    addNewSymbol(postText){
        this._state.post.textArea = postText
        this._rerenderAllTree()
    },
    addMessage(){
        let newMessage = {
            message: this._state.dialog.textAreaMess,
            id: "5"
        }
        this._state.dialog.privateMessageData.push(newMessage)
        this._state.dialog.textAreaMess = ''
        this._rerenderAllTree()
    },
    addNewSymbolMessage(messText){
        this._state.dialog.textAreaMess = messText
        this._rerenderAllTree()
    },
    subscribe(observer){
        this._rerenderAllTree = observer
    }
}

window.store = store

export default store