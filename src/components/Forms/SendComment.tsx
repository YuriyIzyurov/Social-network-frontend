import React from 'react';
import {Input} from 'antd';
import {SendMessageForm} from "components/FormikInput/SendMessageForm";
import {useSelector} from "react-redux";
import {getLoggedUserPhoto} from "redux/profile-selectors";
import {getMe} from "redux/auth-selectors";

const { TextArea } = Input;

const SendComment = ({sendComment}:{sendComment: (value: string) => void}) => {

    const profileAvatar = useSelector(getLoggedUserPhoto)
    const isAuth = useSelector(getMe)

    const handleComment = (value:string) => {
        sendComment(value)
    }

    return (
       <>
           <div className="post__comments-textarea">
               <div className="post-avatar">
                   {isAuth && <img src={profileAvatar?.small} alt="ava"/>}
               </div>
               <SendMessageForm sendMessage={handleComment}/>
           </div>
       </>
    );
};

export default SendComment;