import React from 'react';
import instagram from "assets/images/instagram.png";
import vk from "assets/images/vk.png";
import {GithubOutlined} from '@ant-design/icons';
import './SocialMediaContact.scss'

const SocialMediaContact = ({contactValue,socialMedia}:{contactValue:string,socialMedia:string}) => {

    const redirectToExternal = () => {
        if(contactValue.includes('https://')) {
            window.open(contactValue)
        } else {
            window.open(`https://${contactValue}`)
        }
    }

    if(!contactValue) return <div></div>
    return (
        <div onClick={redirectToExternal} className="social__media">
            <div className="social__media-background">
                {!(socialMedia === 'github') && <img src={socialMedia === 'instagram' ? instagram : vk} alt='inst'/>}
                {(socialMedia === 'github') && <GithubOutlined style={{fontSize:'24px'}}/>}
            </div>
            <div className="social__media-link">
                {contactValue.replace(/.*com\//g,'@')}
            </div>
        </div>
    );
};

export default SocialMediaContact;