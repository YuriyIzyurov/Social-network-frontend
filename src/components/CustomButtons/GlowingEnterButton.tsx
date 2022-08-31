import React from 'react';
import './GlowingEnterButton.scss'

type PropsType = {
    onClick?: () => void
    sizeX?: number
}
export const GlowingEnterButton:React.FC<PropsType> = ({onClick, sizeX}) => {


    return (
        <button
            type='submit'
            onClick={onClick}
            className='glowing-button'
            style={{paddingLeft:`${sizeX}px`, paddingRight:`${sizeX}px`}}
        >
                <span>
                    Enter
                </span><i></i>
        </button>
    )
}
