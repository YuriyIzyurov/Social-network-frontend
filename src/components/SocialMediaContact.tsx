import React from 'react';
import instagram from "assets/images/instagram.png";
import vk from "assets/images/vk.png";
import {GithubOutlined} from '@ant-design/icons';
import github from "assets/images/github.png";

const SocialMediaContact = ({contactValue,socialMedia}:{contactValue:string,socialMedia:string}) => {

    if(!contactValue) return <div></div>
    return (
        <div className="social__media">
            <div className="social__media-background">
                {!(socialMedia === 'github') && <img src={socialMedia === 'instagram' ? instagram : vk} alt='insta'/>}
                {(socialMedia === 'github') && <GithubOutlined style={{fontSize:'24px'}}/>}
            </div>
            <div className="social__media-link">
                @izyurovy
            </div>
        </div>
    );
};

export default SocialMediaContact;