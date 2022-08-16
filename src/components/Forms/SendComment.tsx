import React, {useState} from 'react';
import {Button, Input} from 'antd';
const { TextArea } = Input;

const SendComment = ({sendComment}:{sendComment: (value: string) => void}) => {

    const [value, setValue] = useState('');

    const handleComment = () => {
        sendComment(value)
        setValue('')
    }

    return (
       <>
           <div className="post__comments-textarea">
               <div className="post-avatar">
                   <img src="https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg" alt="ava"/>
               </div>
               <div className="input">
                   <TextArea
                       className="message__form-textarea"
                       size="small"
                       placeholder="Введите текст комментария..."
                       autoSize={{ minRows: 2, maxRows: 6 }}
                       value={value}
                       onChange={e => setValue(e.target.value)}
                   />
               </div>
           </div>
           <div className="sendButton">
               <Button onClick={handleComment} type="primary"  size='large'>
                   Отправить комментарий
               </Button>
           </div>
       </>
    );
};

export default SendComment;