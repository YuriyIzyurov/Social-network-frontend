import React, {Dispatch, MouseEventHandler, SetStateAction, useState} from 'react';
import { Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './SendMessageForm.scss'
import {ThunkType} from "../../redux/dialogReducer";
import classnames from "classnames";

const { TextArea } = Input;

type PropsType = {
    id: number
    handlingMessage: (id: number, body: string) => ThunkType
    setMessageSending: Dispatch<SetStateAction<boolean>>
}
export const SendMessageForm: React.FC<PropsType> = ({id, handlingMessage, setMessageSending}) => {
    const [value, setValue] = useState('');

    const sendMessage:MouseEventHandler<HTMLSpanElement> = () => {
        setMessageSending(true)
        handlingMessage(id, value)
        setValue('')
    }
    return (
        <div className="message__form">
            <div className={classnames("message__form--full",{"message__form--empty": !value})} >
                <TextArea
                    className="message__form-textarea"
                    size="small"
                    placeholder="Введите текст сообщения..."
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                {value && <SendOutlined onClick={sendMessage} className="message__form-icon"/>}
            </div>
        </div>

    );
};
