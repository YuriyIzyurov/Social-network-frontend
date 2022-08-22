import React, {createRef, Dispatch, SetStateAction} from 'react';
import {PhotosType} from "typings/types";
import {ProxyImageUrl} from "utils/ChangeURL/ProxifyURL";
import UserDefaultPhoto from "assets/images/UserDefaultPhoto";
import {getTwoMainColors} from "utils/Color/MainColorsThief";


type PropsType = {
    photos: PhotosType
    changeAvaBorderColors: Dispatch<SetStateAction<string[]>>
}
const MainAvatar:React.FC<PropsType> = ({photos, changeAvaBorderColors}) => {

    const imgRef = createRef<HTMLImageElement>()
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

export default MainAvatar;