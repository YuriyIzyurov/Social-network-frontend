import React from 'react';
import {Input} from 'antd';
import {SendMessageForm} from "components/FormikInput/SendMessageForm";

const { TextArea } = Input;

const SendComment = ({sendComment}:{sendComment: (value: string) => void}) => {

    const handleComment = (value:string) => {
        sendComment(value)
    }

    return (
       <>
           <div className="post__comments-textarea">
               <div className="post-avatar">
                   <img src="https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg" alt="ava"/>
               </div>
           </div>
           <SendMessageForm sendMessage={handleComment}/>
       </>
    );
};

export default SendComment;