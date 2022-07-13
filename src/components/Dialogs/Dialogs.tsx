import React, { useEffect } from "react"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/Textarea";
import {maxLength200, minLength2} from "../../utils/validators/validators";
import {PrivateMessageDataType, PrivateMessageType, UserType} from "../../typings/types";
import {FriendFilterType, ThunkType} from "../../redux/dialogReducer";
import {ThunkType as UsersThunkType} from "../../redux/usersReducer";
import {Button, Col, Row} from 'antd'
import {DownloadOutlined} from '@ant-design/icons';
import './Dialogs.scss'
import {useSelector} from "react-redux";
import { getActiveFriendsPage, getFriendsOnPage } from "../../redux/dialog-selectors";
import {getAuthID} from "../../redux/auth-selectors";


type PropsMessagesType = {
    friends: Array<UserType>
    privateMessageData: Array<PrivateMessageType>
    handlingFriends: (activePage:number,usersOnPage:number, filter: FriendFilterType) => UsersThunkType
    handlingMessage: (id: number, body: string) => ThunkType
    userID: string
}
type FormDataMessageType = {
    message: string
}
type PropsType = {}

const Dialogs: React.FC<PropsMessagesType> = ({friends, privateMessageData,  handlingFriends,handlingMessage, userID}) => {
    const activePage = useSelector(getActiveFriendsPage)
    const usersOnPage = useSelector(getFriendsOnPage)
    const isMe = useSelector(getAuthID)

    const filter: FriendFilterType = {term: '', friend: true}

    useEffect(() => {
        handlingFriends(activePage, usersOnPage,filter)
    }, [])

    let dialog = friends.map(n=><DialogItem name={n.name} key={n.name} id={n.id} src={n.photos.small}/>)
    let isRead = true

    let message = privateMessageData.map(m=><Message key={m.id}
                                                     message={m.body}
                                                     avatar={m.photos.small}
                                                     date={m.addedAt}
                                                     userName={"Юрий"}
                                                     isMe={true}
                                                     isRead={isRead}
    />)

    const onSubmit = (formData: FormDataMessageType) => {
        let id = +userID
        handlingMessage(id, formData.message)

    }

    const DialogForm: React.FC<InjectedFormProps<FormDataMessageType, PropsType> & PropsType> = ({handleSubmit}) => {
        return <form onSubmit={handleSubmit}>
            <div>
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
                <div className="dialog">
                    {dialog}
                </div>
            </Col>
            <Col span={16}>
                {/*<Message key={1}
                         message={"Привет, это сообщение от собеседника"}
                         avatar="https://sun1-57.userapi.com/s/v1/ig1/JYi_Ms2lLHXkb3MXHqwOV5u26RdJ1gwEfPChmxt7fBL73LUTB_xVhkbnXwfQjGfjZ4MpJdIi.jpg?size=100x100&quality=96&crop=661,238,1224,1224&ava=1"
                         date={date}
                         userName={"Денис"}
                         isMe={false}
                         isRead={false}/>*/}
                {message}
                <DialogFormRedux onSubmit={onSubmit}/>
            </Col>
        </Row>
    </div>

}

export default Dialogs