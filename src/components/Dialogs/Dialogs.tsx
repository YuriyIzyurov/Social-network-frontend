import React, {useEffect} from "react"
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/Textarea";
import {maxLength200, minLength2} from "../../utils/validators/validators";
import {DialogDataType, PrivateMessageDataType, UserType} from "../../typings/types";
import {FriendFilterType, handlingFriends} from "../../redux/dialogReducer";
import {FilterType, ThunkType as UsersThunkType} from "../../redux/usersReducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {getActivePage, getUsersOnPage} from "../../redux/user-selectors";
import {getActiveFriendsPage, getFriendsOnPage} from "../../redux/dialog-selectors";


type PropsMessagesType = {
    friends: Array<UserType>
    privateMessageData: Array<PrivateMessageDataType>
    sendNewMessage: (formData:string) => void
    handlingFriends: (activePage:number,usersOnPage:number, filter: FriendFilterType) => UsersThunkType
}
type FormDataMessageType = {
    message: string
}
type PropsType = {}

const Dialogs: React.FC<PropsMessagesType> = ({friends, privateMessageData, sendNewMessage, handlingFriends }) => {
    const activePage = useSelector(getActiveFriendsPage)
    const usersOnPage = useSelector(getFriendsOnPage)
    const filter: FriendFilterType = {term: '', friend: true}

    useEffect(() => {
        handlingFriends(activePage, usersOnPage,filter)
    }, [])

    let dialog = friends.map(n=><DialogItem name={n.name} key={n.name} id={n.id} src={n.photos.small}/>)
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