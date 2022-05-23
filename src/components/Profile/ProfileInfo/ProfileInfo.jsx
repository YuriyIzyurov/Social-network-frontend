import React from "react"
import s from './ProfileInfo.module.css'


const ProfileInfo = (props) => {

    return (
        <div>
            <div>
                <img src='https://png.pngtree.com/thumb_back/fw800/back_pic/04/06/69/4958106611a2dbe.jpg' width='500px'/>
            </div>
            <img src={props.currentProfile.photos.large}/>
            <div>
                {props.currentProfile.aboutMe}
            </div>
            <div className={s.descriptionBlock}>
                {props.currentProfile.fullName}
            </div>
        </div>
    )
}

export default ProfileInfo