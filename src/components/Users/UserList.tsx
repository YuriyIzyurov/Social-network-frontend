import React, {LegacyRef, useEffect, useRef} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import {Button as AntButton, Divider, List, Skeleton, Tooltip} from "antd";
import Avatar from "../Dialogs/DialogItem/Avatar";
import {CommentOutlined, UserAddOutlined, UserDeleteOutlined} from "@ant-design/icons";
import {UserType} from "../../typings/types";
import {FilterType} from "../../redux/usersReducer";

type PropsType = {
    users: Array<UserType>
    handlingFollow: (user: number) => void
    handlingUnfollow: (user: number) => void
    followInProcess: Array<number>
    loadMoreData: () => void
    isPagesLast: boolean
    openDialog: (id: number) => void
    isFetching: boolean
    usersRef: LegacyRef<HTMLDivElement>

}


export const UserList: React.FC<PropsType> = ({users,   loadMoreData, isFetching, isPagesLast, openDialog, followInProcess, handlingFollow, handlingUnfollow, usersRef }) => {


    const ItemList = ({item}: {item: UserType}) => {
        return <>
            <List.Item.Meta
                avatar={<a href={"/profile/" + item.id}><Avatar user={item}/></a>}
                title={<a href={"/profile/" + item.id}>{item.name}</a>}
                description={item.status}
            />
            <Tooltip title="Открыть диалог">
                <CommentOutlined className="icon" onClick={e => openDialog(item.id)}/>
            </Tooltip>
            {!item.followed
                ? <Tooltip title="Добавить в друзья">
                    <AntButton className="users__find-button" shape="circle"
                               icon={<UserAddOutlined className="icon"/>} size="large"
                               disabled={followInProcess.some(el => el === item.id)}
                               onClick={() => {
                                   handlingFollow(item.id)
                               }}/>
                </Tooltip>
                : <Tooltip title="Удалить из друзей">
                    <AntButton className="users__find-button" shape="circle"
                               icon={<UserDeleteOutlined className="icon"/>} size="large"
                               disabled={followInProcess.some(el => el === item.id)}
                               onClick={() => {
                                   handlingUnfollow(item.id)
                               }}/>
                </Tooltip>}
        </>
    }

        return (
            <div
                id="scrollableDiv"
                className="users__find-content"
                ref={usersRef}
            >
                <InfiniteScroll
                    dataLength={users.length}
                    next={loadMoreData}
                    hasMore={users.length < 1000}
                    loader={isPagesLast ? <Divider plain>It is all, nothing more 🤐</Divider> :
                        <Skeleton avatar paragraph={{rows: 1}} active/>}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"

                >
                    <List
                        dataSource={users}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <Skeleton loading={isFetching} active avatar>
                                    <ItemList item={item}/>
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        );
};

