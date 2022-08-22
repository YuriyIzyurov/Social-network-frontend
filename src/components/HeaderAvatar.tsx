import React, {createRef, Dispatch, SetStateAction} from 'react';
import {ProxyImageUrl} from "utils/ChangeURL/ProxifyURL";
import UserDefaultPhoto from "assets/images/UserDefaultPhoto";
import {getTwoMainColors} from "utils/Color/MainColorsThief";
import {PhotosType} from "typings/types";

type PropsType = {
    photos: PhotosType | null
}
const HeaderAvatar:React.FC<PropsType> = ({photos}) => {

    return (
        <div className="profile__info-main-avatar" >
            {photos?.large ? <img
                    src={ProxyImageUrl(photos.large)}
                    alt="user"/>
                : <UserDefaultPhoto/>}
        </div>
    );
};

export default HeaderAvatar;