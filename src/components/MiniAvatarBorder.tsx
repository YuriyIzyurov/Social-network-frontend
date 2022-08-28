import React from 'react';

const MiniAvatarBorder = ({colors}:{colors:string[]}) => {
    return (
        <div className="header__avatar-border">
            <svg width="84" height="90" viewBox="0 0 84 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M71.2122 14.7056L53.5093 4.48484C46.3931 0.376278 37.6255 0.376276 30.5093 4.48484L12.8064 14.7056C5.69017 18.8142 1.3064 26.4071 1.3064 34.6242V55.0658C1.3064 63.2829 5.69017 70.8758 12.8064 74.9844L30.5093 85.2052C37.6255 89.3137 46.3931 89.3137 53.5093 85.2052L71.2122 74.9844C78.3284 70.8758 82.7122 63.2829 82.7122 55.0658V34.6242C82.7122 26.4071 78.3284 18.8142 71.2122 14.7056Z" stroke="url(#batm1x)" strokeWidth="2"/>
                <defs>
                    <linearGradient id="batm1x" x1="14.2805" y1="4.91548" x2="74.5445" y2="82.5562" gradientUnits="userSpaceOnUse">
                        <stop stopColor={colors[0]}/>
                        <stop offset="1" stopColor={colors[1]}/>
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default MiniAvatarBorder