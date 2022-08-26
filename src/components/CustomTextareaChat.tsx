/*
import React from 'react';
import classnames from "classnames";
import {SendOutlined} from "@ant-design/icons";
import { Input } from 'antd';
const { TextArea } = Input;

const CustomTextareaChat = () => {
    return (
        <div className="chat__block-textarea">
            <div className={classnames("input-full",{"input-empty": !message})} >
                <TextArea
                    className="textarea"
                    size="small"
                    placeholder="Введите текст сообщения..."
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                {message && <SendOutlined onClick={sendMessageHandler} disabled={true} className="icon"/>}
            </div>
        </div>
    );
};

export default CustomTextareaChat;*/
