import React, {useEffect} from "react"
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/Textarea";
import {maxLength200, minLength2} from "../../utils/validators/validators";
import {DialogDataType, PrivateMessageDataType, UserType} from "../../typings/types";
import {FriendFilterType, ThunkType} from "../../redux/dialogReducer";
import {FilterType, ThunkType as UsersThunkType} from "../../redux/usersReducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {getActivePage, getUsersOnPage} from "../../redux/user-selectors";
import {getActiveFriendsPage, getFriendsOnPage} from "../../redux/dialog-selectors";
import UserListDialog from "./UserListDialog";
import { Col, Row, Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons';





type PropsMessagesType = {
    friends: Array<UserType>
    privateMessageData: Array<PrivateMessageDataType>
    sendNewMessage: (formData:string) => void
    handlingFriends: (activePage:number,usersOnPage:number, filter: FriendFilterType) => UsersThunkType
    handlingMessage: (id: number, body: string) => ThunkType
    userID: string
}
type FormDataMessageType = {
    message: string
}
type PropsType = {}

const Dialogs: React.FC<PropsMessagesType> = ({friends, privateMessageData, sendNewMessage, handlingFriends,handlingMessage, userID}) => {

    //let dialog = friends.map(n=><DialogItem name={n.name} key={n.name} id={n.id} src={n.photos.small}/>)
    const date = new Date()

    let message = privateMessageData.map(m=><Message key={m.message}
                                                     message={m.message}
                                                     avatar="https://sun1-92.userapi.com/s/v1/ig2/Ldi-fgaFFOfbbtuQ31u10X8SDOW-fMkrQq-C44I579B4HQ28Yy8MtYysuZEnRokyf8XnqwNKSQ7bsvDmP3yFnWmD.jpg?size=50x50&quality=95&crop=8,512,1391,1391&ava=1"
                                                     date={date}
                                                     userName={"Юрий"}
                                                     isMe={true}
    />)

    const onSubmit = (formData: FormDataMessageType) => {
        /*let id = +userID
        handlingMessage(id, formData.message)*/
        sendNewMessage(formData.message)
    }

    const DialogForm: React.FC<InjectedFormProps<FormDataMessageType, PropsType> & PropsType> = ({handleSubmit}) => {
        return <form onSubmit={handleSubmit}>
            <div className={s.sendMessage}>
                <div>
                    <Field component={Textarea} name={"message"} validate={[maxLength200, minLength2]}/>
                </div>
                <div>
                    <Button type="primary" shape="round" icon={<DownloadOutlined />} size={'large'}>Send message</Button>
                    <button type="submit">
                        Send message
                    </button>
                </div>
            </div>
        </form>
    }

    let DialogFormRedux = reduxForm<FormDataMessageType, PropsType>({
        form: 'dialog'
    })(DialogForm)

    return <div>
        <Row>
            <Col span={8}>
                <UserListDialog/>
            </Col>
            <Col span={16}>
                <Message key={1}
                         message={"Привет, это сообщение от собеседника"}
                         avatar="https://sun1-57.userapi.com/s/v1/ig1/JYi_Ms2lLHXkb3MXHqwOV5u26RdJ1gwEfPChmxt7fBL73LUTB_xVhkbnXwfQjGfjZ4MpJdIi.jpg?size=100x100&quality=96&crop=661,238,1224,1224&ava=1"
                         date={date}
                         userName={"Денис"}
                         isMe={false}/>
                {message}
                <DialogFormRedux onSubmit={onSubmit}/>
            </Col>
        </Row>
    </div>

}

export default Dialogs