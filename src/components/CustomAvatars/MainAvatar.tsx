import React, {createRef, Dispatch, SetStateAction, useEffect} from 'react';
import {PhotosType} from "typings/types";
import {ProxyImageUrl} from "utils/ChangeURL/ProxifyURL";
import {getTwoMainColors} from "utils/Color/MainColorsThief";
import {UserDefaultPhoto} from "assets/VectorComponents";


type PropsType = {
    photos: PhotosType
    changeAvaBorderColors: Dispatch<SetStateAction<string[]>>
}
export const MainAvatar:React.FC<PropsType> = ({photos, changeAvaBorderColors}) => {

    const imgRef = createRef<HTMLImageElement>()

    useEffect(()=>{
        if(!photos.large) {
            changeAvaBorderColors(["#A73EE7","#00EBFF"])
        }
    },[photos])

    const getMainColors = () => {
        changeAvaBorderColors(getTwoMainColors(imgRef.current))
    }

    return (
        <div className="profile__info-main-avatar" >
            {photos?.large ? <img
                    src={ProxyImageUrl(photos.large)}
                    ref={imgRef}
                    onLoad={getMainColors}
                    crossOrigin="anonymous"
                    alt="user"/>
                : <UserDefaultPhoto/>}
        </div>
    );
};
