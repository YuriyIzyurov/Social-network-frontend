import React from "react"
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";


const Dialogs = (props) => {

    let dialog = props.DialogData.map(n=><DialogItem name={n.name} id={n.id} src={n.src}/>)
    let message = props.privateMessageData.map(m=><Message message={m.message}/>)

    let newMessage = React.createRef();
    let sendMessage = ()=>{
        alert(newMessage.current.value)
    }
    return <div className={s.dialogs}>
        <div className={s.dialogItems}>
            {dialog}
        </div>
        <div className={s.messages}>
            {message}
            <div className={s.sendMessage}>
                <div>
                    <textarea ref={newMessage}></textarea>
                </div>
                <div>
                    <button onClick={sendMessage}>Send message</button>
                </div>
            </div>
        </div>


    </div>

}

export default Dialogs