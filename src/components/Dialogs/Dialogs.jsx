import React from "react"
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/Textarea";
import {maxLength200, minLength2} from "../../utils/validators/validators";


const Dialogs = (props) => {

    let dialog = props.DialogData.map(n=><DialogItem name={n.name} id={n.id} src={n.src}/>)
    let message = props.privateMessageData.map(m=><Message message={m.message} />)

    const onSubmit = (formData) => {
        props.sendNewMessage(formData.message) // Не понимаю, почему не принимает undefined, хотя пустые посты постились при тех же условиях
    }

    const DialogForm = (props) => {
        return <form onSubmit={props.handleSubmit}>
            <div className={s.sendMessage}>
                <div>
                    <Field component={Textarea} name={"message"} validate={[maxLength200, minLength2]}/>
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