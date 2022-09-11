import React, {useEffect, useState} from 'react';
import {Popover, Tooltip} from "antd";
import {profileAPI} from "api/profileAPI";
import {dialogsAPI} from "api/dialogsAPI";
import {useSelector} from "react-redux";
import {getNumberOfNewMessages} from "redux/dialog-selectors";
import {useAppDispatch} from "redux/reduxStore";
import {actions} from "redux/dialogReducer";
import {CheckOutlined, CloseOutlined, DeleteOutlined} from "@ant-design/icons";


type PropsType = {
    count: number
    onClick: (destination:string) => void
}
export const Bell: React.FC<PropsType> = ({count, onClick}) => {

    const [visibleNotificationTooltip, setVisibleNotificationTooltip] = useState(false)
    const [visiblePopover, setVisiblePopover] = useState(false)

    const showNotificationTooltip = (newVisible:boolean) => {
        if(!visiblePopover) {
            setVisibleNotificationTooltip(newVisible)
        }
    }
    const showPopover = (newVisible:boolean) => {
        setVisiblePopover(newVisible)
        setVisibleNotificationTooltip(false)
    }

    const redirectToDialogs = () => {
        onClick('dialogs')
        setVisiblePopover(false)
    }

    const popoverText = (count:number) => {
        switch (count) {
            case 0: {
                return "Нет новых сообщений"
            }
            case 1: {
                return `У вас ${count} непрочитанное сообщение`
            }
            case 2:
            case 3:
            case 4: {
                return `У вас ${count} непрочитанных сообщения`
            }
            default:{
                return `У вас ${count} непрочитанных сообщений`
            }
        }
    }

    return (
        <Tooltip mouseLeaveDelay={0.05}
                 mouseEnterDelay={0.3}
                 visible={visibleNotificationTooltip}
                 onVisibleChange={showNotificationTooltip}
                 title="Оповещения"
        >
            <Popover
                content={
                    <div className="popover-options">
                        <div>
                            <CheckOutlined style={{color: '#39e324'}}/>
                            <a onClick={redirectToDialogs}>Перейти в диалоги</a>
                        </div>
                    </div>
                }
                title={popoverText(count)}
                trigger="click"
                visible={visiblePopover}
                onVisibleChange={showPopover}
                color={"#2c2f48"}
                overlayClassName="custom-popover"
            >
                <div className='profile-bell'>
                    <svg  width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.6803 14.8721C5.6803 15.3643 6.06311 15.6924 6.69202 15.6924H9.39905C9.45374 16.9365 10.4381 18.044 11.8395 18.044C13.2408 18.044 14.2252 16.9434 14.2867 15.6924H16.9869C17.6158 15.6924 17.9987 15.3643 17.9987 14.8721C17.9987 14.209 17.3492 13.6279 16.7819 13.0537C16.3444 12.6094 16.235 11.7002 16.1735 10.9072C16.1119 8.39161 15.4352 6.75098 13.7262 6.12891C13.5006 5.28126 12.7965 4.61817 11.8395 4.61817C10.8824 4.61817 10.1852 5.28126 9.95276 6.12891C8.24377 6.75098 7.56702 8.39161 7.50549 10.9072C7.45081 11.7002 7.33459 12.6094 6.89709 13.0537C6.32971 13.6279 5.6803 14.209 5.6803 14.8721ZM7.03381 14.6533V14.5713C7.17053 14.3867 7.55334 14.0176 7.88147 13.6416C8.33948 13.1289 8.55823 12.2607 8.61292 11.0098C8.67444 8.25489 9.50159 7.35938 10.5885 7.06544C10.7526 7.02442 10.8414 6.94923 10.8483 6.77833C10.8756 6.10841 11.2516 5.6504 11.8395 5.6504C12.4274 5.6504 12.8102 6.10841 12.8307 6.77833C12.8444 6.94923 12.9332 7.02442 13.0905 7.06544C14.1774 7.35938 15.0045 8.25489 15.066 11.0098C15.1276 12.2607 15.3395 13.1289 15.7975 13.6416C16.1324 14.0176 16.5084 14.3867 16.6383 14.5713V14.6533H7.03381ZM10.4791 15.6924H13.2067C13.1588 16.5469 12.6051 17.0938 11.8395 17.0938C11.0739 17.0938 10.527 16.5469 10.4791 15.6924Z" fill="white" fillOpacity="0.6"/>
                    </svg>
                    {count !== 0 && <div className='profile-bell-notification'>{count}</div>}
                </div>
            </Popover>
        </Tooltip>
    );
};

export const Chat = ({onClick}:{onClick: (destination:string) => void}) => {
    const redirectToDialogs = () => {
         onClick('dialogs')
    }

    return (
        <Tooltip mouseLeaveDelay={0.05}
                 mouseEnterDelay={0.3}
                 title="Диалоги"
        >
            <svg onClick={redirectToDialogs} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.67273 18.1602C8.54773 18.1602 10.3524 17.2852 11.6786 16.335C16.204 16.4443 19.5946 13.8399 19.5946 10.4287C19.5946 7.14747 16.3065 4.5088 12.2118 4.5088C8.11023 4.5088 4.82214 7.14747 4.82214 10.4287C4.82214 12.5547 6.16882 14.4414 8.21277 15.3984C7.91882 15.9522 7.39246 16.6973 7.10535 17.0801C6.74304 17.5586 6.96863 18.1602 7.67273 18.1602ZM8.38367 17.0049C8.32214 17.0322 8.2948 16.9912 8.33582 16.9365C8.69128 16.5059 9.19714 15.8428 9.42273 15.419C9.6073 15.0772 9.55261 14.7764 9.14246 14.5781C7.13269 13.6416 5.97058 12.1445 5.97058 10.4287C5.97058 7.79688 8.7323 5.6504 12.2118 5.6504C15.6844 5.6504 18.4462 7.79688 18.4462 10.4287C18.4462 13.0674 15.6844 15.2139 12.2118 15.2139C12.0819 15.2139 11.8905 15.207 11.6444 15.2002C11.3641 15.2002 11.1591 15.2822 10.913 15.4805C10.12 16.0547 8.96472 16.7725 8.38367 17.0049Z" fill="white" fillOpacity="0.6"/>
            </svg>
        </Tooltip>
    );
};
export const Mail = ({onClick}:{onClick: (status:boolean) => void}) => {
    const editContacts = () => {
        onClick(true)
    }
    return (
        <Tooltip mouseLeaveDelay={0.05}
                 mouseEnterDelay={0.3}
                 title="Контакты"
        >
            <svg onClick={editContacts} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.71216 17.3193H16.8616C18.2288 17.3193 18.9192 16.6289 18.9192 15.2822V7.39356C18.9192 6.04688 18.2288 5.35645 16.8616 5.35645H5.71216C4.34497 5.35645 3.64771 6.04005 3.64771 7.39356V15.2822C3.64771 16.6357 4.34497 17.3193 5.71216 17.3193ZM5.74634 16.1982C5.11743 16.1982 4.7688 15.8633 4.7688 15.207V7.46192C4.7688 6.80567 5.11743 6.47071 5.74634 6.47071H16.8274C17.4495 6.47071 17.8049 6.80567 17.8049 7.46192V15.207C17.8049 15.8633 17.4495 16.1982 16.8274 16.1982H5.74634ZM14.6877 11.2285C15.5354 11.2285 16.2327 10.5381 16.2327 9.67677C16.2327 8.82227 15.5354 8.12501 14.6877 8.12501C13.8264 8.12501 13.136 8.82227 13.136 9.67677C13.136 10.5381 13.8264 11.2285 14.6877 11.2285ZM6.79224 9.34864H10.8801C11.1399 9.34864 11.3381 9.13673 11.3381 8.8838C11.3381 8.63087 11.1399 8.42579 10.8801 8.42579H6.79224C6.53247 8.42579 6.33423 8.63087 6.33423 8.8838C6.33423 9.13673 6.53247 9.34864 6.79224 9.34864ZM6.79224 11.0645H9.77271C10.0325 11.0645 10.2375 10.8662 10.2375 10.6065C10.2375 10.3535 10.0325 10.1484 9.77271 10.1484H6.79224C6.53247 10.1484 6.33423 10.3535 6.33423 10.6065C6.33423 10.8662 6.53247 11.0645 6.79224 11.0645Z" fill="white" fillOpacity="0.6"/>
            </svg>
        </Tooltip>
    );
};
export const Setting = () => {
    return (
            <svg style={{cursor:'no-drop'}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.969 19.7109H12.5471C13.1487 19.7109 13.6096 19.3438 13.7502 18.7656L14.0862 17.3047L14.3362 17.2188L15.6096 18C16.1174 18.3203 16.7034 18.2422 17.1331 17.8125L18.2268 16.7266C18.6565 16.2969 18.7346 15.7031 18.4143 15.2031L17.6174 13.9375L17.7112 13.7031L19.1721 13.3594C19.7424 13.2188 20.1174 12.75 20.1174 12.1563V10.6094C20.1174 10.0156 19.7502 9.54688 19.1721 9.40626L17.7268 9.0547L17.6252 8.8047L18.4221 7.53907C18.7424 7.03907 18.6643 6.45313 18.2346 6.01563L17.1409 4.92188C16.719 4.50001 16.1331 4.42188 15.6252 4.73438L14.3518 5.51563L14.0862 5.41407L13.7502 3.95313C13.6096 3.37501 13.1487 3.00782 12.5471 3.00782H10.969C10.3674 3.00782 9.90649 3.37501 9.76587 3.95313L9.42212 5.41407L9.15649 5.51563L7.89087 4.73438C7.38306 4.42188 6.78931 4.50001 6.36743 4.92188L5.28149 6.01563C4.85181 6.45313 4.76587 7.03907 5.09399 7.53907L5.88306 8.8047L5.78931 9.0547L4.34399 9.40626C3.76587 9.54688 3.39868 10.0156 3.39868 10.6094V12.1563C3.39868 12.75 3.77368 13.2188 4.34399 13.3594L5.80493 13.7031L5.89087 13.9375L5.10181 15.2031C4.77368 15.7031 4.85962 16.2969 5.28931 16.7266L6.37524 17.8125C6.80493 18.2422 7.39868 18.3203 7.90649 18L9.17212 17.2188L9.42212 17.3047L9.76587 18.7656C9.90649 19.3438 10.3674 19.7109 10.969 19.7109ZM11.094 18.4922C10.9612 18.4922 10.8909 18.4375 10.8674 18.3125L10.3987 16.375C9.92212 16.2578 9.47681 16.0703 9.14087 15.8594L7.43774 16.9063C7.34399 16.9766 7.24243 16.9609 7.14868 16.8672L6.22681 15.9453C6.14087 15.8594 6.13306 15.7656 6.19556 15.6563L7.24243 13.9688C7.06274 13.6406 6.85962 13.1953 6.73462 12.7188L4.79712 12.2578C4.67212 12.2344 4.61743 12.1641 4.61743 12.0313V10.7266C4.61743 10.5859 4.66431 10.5234 4.79712 10.5L6.72681 10.0313C6.85181 9.52345 7.08618 9.06251 7.22681 8.77345L6.18774 7.08595C6.11743 6.96876 6.12524 6.87501 6.21118 6.78126L7.14087 5.87501C7.23462 5.78126 7.32056 5.76563 7.43774 5.83595L9.12524 6.85938C9.46118 6.67188 9.93774 6.47657 10.4065 6.34376L10.8674 4.40626C10.8909 4.28126 10.9612 4.22657 11.094 4.22657H12.4221C12.5549 4.22657 12.6252 4.28126 12.6409 4.40626L13.1174 6.35938C13.6018 6.48438 14.0237 6.6797 14.3752 6.8672L16.0706 5.83595C16.1956 5.76563 16.2737 5.78126 16.3752 5.87501L17.2971 6.78126C17.3909 6.87501 17.3909 6.96876 17.3206 7.08595L16.2815 8.77345C16.4299 9.06251 16.6565 9.52345 16.7815 10.0313L18.719 10.5C18.844 10.5234 18.8987 10.5859 18.8987 10.7266V12.0313C18.8987 12.1641 18.8362 12.2344 18.719 12.2578L16.7737 12.7188C16.6487 13.1953 16.4534 13.6406 16.2659 13.9688L17.3127 15.6563C17.3752 15.7656 17.3752 15.8594 17.2815 15.9453L16.3674 16.8672C16.2659 16.9609 16.1721 16.9766 16.0706 16.9063L14.3674 15.8594C14.0315 16.0703 13.594 16.2578 13.1174 16.375L12.6409 18.3125C12.6252 18.4375 12.5549 18.4922 12.4221 18.4922H11.094ZM11.7581 14.3438C13.3909 14.3438 14.7346 13 14.7346 11.3594C14.7346 9.73438 13.3909 8.39063 11.7581 8.39063C10.1252 8.39063 8.77368 9.73438 8.77368 11.3594C8.77368 12.9922 10.1174 14.3438 11.7581 14.3438ZM11.7581 13.1328C10.7893 13.1328 9.99243 12.3359 9.99243 11.3594C9.99243 10.3984 10.7893 9.60157 11.7581 9.60157C12.7112 9.60157 13.5081 10.3984 13.5081 11.3594C13.5081 12.3281 12.7112 13.1328 11.7581 13.1328Z" fill="#EBEBF5" fillOpacity="0.6"/>
            </svg>
    );
};
