import './AddPostButton.scss'


import React from 'react';
import classnames from 'classnames';

type PropsType = {
    text?:string
    onClick?: () => void
    animation?:boolean
}
const AddPostButton:React.FC<PropsType> = ({text, onClick, animation= true}) => {
    return (
        <div className={classnames('addPost-button', {'addPost-button-animated': animation})}>
            <button  onClick={onClick}>
                <span>{text ? text : 'button' }</span>
            </button>
            {animation && <>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </>}
        </div>
    );
};

export default AddPostButton;