import React from "react"
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/Textarea";
import {maxLength200, minLength2} from "../../utils/validators/validators";
import {DialogDataType, PrivateMessageDataType} from "../../typings/types";


type PropsMessagesType = {
    DialogData: Array<DialogDataType>
    privateMessageData: Array<PrivateMessageDataType>
    sendNewMessage: (formData:string) => void
}
type FormDataMessageType = {
    message: string
}
type PropsType = {}

const Dialogs: React.FC<PropsMessagesType> = ({DialogData, privateMessageData, sendNewMessage }) => {

    let dialog = DialogData.map(n=><DialogItem name={n.name} key={n.name} id={n.id} src={n.src}/>)
    let message = privateMessageData.map(m=><Message message={m.message} key={m.message} />)

    const onSubmit = (formData: FormDataMessageType) => {
        sendNewMessage(formData.message)
    }

    const DialogForm: React.FC<InjectedFormProps<FormDataMessageType, PropsType> & PropsType> = ({handleSubmit}) => {
        return <form onSubmit={handleSubmit}>
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

    let DialogFormRedux = reduxForm<FormDataMessageType, PropsType>({
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