import React from "react"
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";


const Dialogs = (props) => {

    let dialog = props.DialogData.map(n=><DialogItem name={n.name} id={n.id} src={n.src}/>)
    let message = props.privateMessageData.map(m=><Message message={m.message} />)

    const onSubmit = (formData) => {
        props.sendNewMessage(formData.message)
    }

    const DialogForm = (props) => {
        return <form onSubmit={props.handleSubmit}>
            <div className={s.sendMessage}>
                <div>
                    <Field component={"textarea"} name={"message"}/>
                </div>
                <div>
                    <button type="submit">Send message</button>
                </div>
            </div>
        </form>
    }

    let DialogFormRedux = reduxForm({
        form: 'dialog'
    })(DialogForm)

    return <div className={s.dialogs}>
        <div className={s.dialogItems}>
            {dialog}
        </div>
        <div className={s.messages}>
            {message}
            <DialogFormRedux onSubmit={onSubmit}/>
        </div>
    </div>

}

export default Dialogs