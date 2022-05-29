import React from "react"
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Navigate} from "react-router";



const Dialogs = (props) => {

    let dialog = props.DialogData.map(n=><DialogItem name={n.name} id={n.id} src={n.src}/>)
    let message = props.privateMessageData.map(m=><Message message={m.message} />)

    let sendMessage = ()=>{
        props.sendNewMessage()
    }
    let changeArea = (onChange) => {
        props.addNewSymbolMessage(onChange.target.value)
    }
    if(!props.isAuth) return <Navigate to="/login"/>
    return <div className={s.dialogs}>
        <div className={s.dialogItems}>
            {dialog}
        </div>
        <div className={s.messages}>
            {message}
            <div className={s.sendMessage}>
                <div>
                    <textarea onChange={changeArea} value={props.textAreaMess}/>
                </div>
                <div>
                    <button onClick={sendMessage}>Send message</button>
                </div>
            </div>
        </div>


    </div>

}

export default Dialogs