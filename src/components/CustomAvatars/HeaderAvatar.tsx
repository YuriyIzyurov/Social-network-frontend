import React, {useEffect, useState} from 'react';
import {ProxyImageUrl} from "utils/ChangeURL/ProxifyURL";
import {PhotosType} from "typings";
import {MiniAvatarBorder, UserDefaultPhoto} from 'assets/VectorComponents';

type PropsType = {
    photo: string
    colors:string[]
}
export const HeaderAvatar:React.FC<PropsType> = ({photo, colors}) => {

    useEffect(()=>{
        console.log(photo)
    },[photo])

    return (
        <>
            <MiniAvatarBorder colors={colors}/>
            <div className="profile__info-main-avatar" >
                {photo
                    ? <img src={photo} alt="user"/>
                    : <UserDefaultPhoto/>}
            </div>
        </>
    );
};

