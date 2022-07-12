import { Avatar, Button, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import {useAppDispatch} from "../../redux/reduxStore";
import {useSelector} from "react-redux";
import {getActiveFriendsPage, getFriends, getFriendsOnPage} from "../../redux/dialog-selectors";
import {actions, FriendFilterType, handlingFriends} from "../../redux/dialogReducer";
import {UserType} from "../../typings/types";
import {stopChatListening} from "../../redux/chatReducer";
import "./Dialogs.scss"


type DialogDataType = UserType & {loading: boolean}


const UserListDialog: React.FC = React.memo(() => {
    const [initLoading, setInitLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<DialogDataType[]>([])
    const [list, setList] = useState<DialogDataType[]>([])

    const activePage = useSelector(getActiveFriendsPage)
    const usersOnPage = useSelector(getFriendsOnPage)
    const filter: FriendFilterType = {term: '', friend: true}
    const dispatch = useAppDispatch()
    const friends: Array<UserType> = useSelector(getFriends)

    useEffect(() => {
        dispatch(handlingFriends(activePage, usersOnPage,filter))
        return () => {
            dispatch(actions.clearFriendList())
            dispatch(actions.setActiveFriendPage(1))
        }
    }, [])

    useEffect(() => {
        setInitLoading(false)
        setData(friends as DialogDataType[])
        setList(friends as DialogDataType[])

    }, [friends])


    const onLoadMore = () => {
        setLoading(true)
        setList(
            data.concat([...new Array(3)].map(() => ({ loading: true, name: {}, photos: {} })) as DialogDataType[]),
        )
        dispatch(actions.setActiveFriendPage(activePage + 1))
        dispatch(handlingFriends(activePage + 1, usersOnPage,filter))
        setLoading(false);
        window.dispatchEvent(new Event('resize'))
    }

    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>load more</Button>
            </div>
        ) : null;


    return (

        <List
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
                <List.Item

                    actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            className="user-list"
                            avatar={<Avatar src={item.photos.large} />}
                            title={<a href="https://ant.design">{item.name}</a>}
                            description={item.status}
                        />
                        <div>content</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    )
})

export default UserListDialog;