import classnames from 'classnames';
import React from 'react';
import './GlowingEnterButton.scss'

type PropsType = {
    onClick?: (destination:string) => void
    sizeX?: number
    disabled?: boolean
}
export const GlowingEnterButton:React.FC<PropsType> = ({onClick, sizeX, disabled}) => {


    const redirectToLogin = () => {
        if(onClick) onClick('login')
    }
    return (
        <button
            type='submit'
            disabled={disabled}
            onClick={redirectToLogin}
            className={classnames('glowing-button', {'glowing-button-disabled': disabled})}
            style={{
                paddingLeft:`${sizeX}px`,
                paddingRight:`${sizeX}px`,
        }}
        >
                <span>
                    Enter
                </span><i></i>
        </button>
    )
}
