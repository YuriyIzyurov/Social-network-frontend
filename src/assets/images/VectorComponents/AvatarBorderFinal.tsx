import React, {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import useHover from "components/HOOK/useHover";



type PropsType = {
    setToggle: Dispatch<SetStateAction<boolean>>
    toggle: boolean
    colors:string[]
}

export const AvatarBorderFinal:React.FC<PropsType> = ({colors, setToggle, toggle}) => {

    const hoverRef = useRef(null)
    const isHover = useHover(hoverRef)


    useEffect(() => {
        if(isHover) {
            setToggle(!toggle)
        }
    }, [isHover])


    return <svg  ref={hoverRef} width="138" height="146" viewBox="0 0 142 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M125.491 28.188L85.5078 5.77443C76.5301 0.741857 65.4693 0.741857 56.4917 5.77443L16.508 28.188C7.53043 33.2206 2 42.5212 2 52.5863V97.4135C2 107.479 7.53043 116.779 16.508 121.812L56.4917 144.225C65.4693 149.258 76.5301 149.258 85.5078 144.225L125.491 121.812C134.469 116.779 140 107.479 140 97.4135V52.5863C140 42.5212 134.469 33.2206 125.491 28.188Z" stroke="url(#paint0_linear_1_3)" strokeWidth="3"/>
        <defs>
            <linearGradient id="paint0_linear_1_3" x1="23.6909" y1="10.0802" x2="122.752" y2="141.526" gradientUnits="userSpaceOnUse">
                <stop stopColor={colors[0]}/>
                <stop offset="1" stopColor={colors[1]}/>
            </linearGradient>
        </defs>
    </svg>
};
