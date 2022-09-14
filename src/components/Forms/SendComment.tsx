import React from 'react';
import {SendMessageForm} from "components/FormikInput/SendMessageForm";
import {useSelector} from "react-redux";
import {getLoggedUserPhoto, getMe} from "redux/Selectors";



export const SendComment = ({sendComment}:{sendComment: (value: string) => void}) => {

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

