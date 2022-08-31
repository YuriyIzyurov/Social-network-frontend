import React, {useState} from 'react';
import {Input} from 'antd';
import {SendOutlined} from '@ant-design/icons';
import './SendMessageForm.scss'
import classnames from "classnames";

const { TextArea } = Input;

type PropsType = {
    sendMessage:(value:string) => void
}
export const SendMessageForm: React.FC<PropsType> = React.memo(({sendMessage}) => {

    const [value, setValue] = useState('');

    const handleMessage = () => {
        sendMessage(value)
        setValue('')
    }

    return (
        <div className="message__form">
            <div className={classnames("message__form--full",{"message__form--empty": !value})} >
                <TextArea
                    className="message__form-textarea"
                    size="small"
                    placeholder="Введите текст сообщения..."
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                {value && <SendOutlined onClick={handleMessage} disabled className="message__form-icon"/>}
            </div>
        </div>

    );
})
