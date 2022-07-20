import { Avatar, Divider, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Settings.scss'
import { Pagination } from 'antd';
import Search from "antd/lib/input/Search";
import { Button, Dropdown, Menu } from 'antd';


interface DataType {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
}

const Settings: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then(res => res.json())
            .then(body => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                            1st menu item
                        </a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                            2nd menu item
                        </a>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                            3rd menu item
                        </a>
                    ),
                },
            ]}
        />
    );
    return (
        <div className="users">
            <div className="users__find">
                <div className="users__find-search">
                    <div className="users__find-search-input">
                        <Search  placeholder="Поиск среди контактов" allowClear  />
                    </div>
                    <div></div> {/*for justify-content: space-between*/}
                    <div className="users__find-search-dropdown">
                        <Dropdown overlay={menu} placement="bottomRight" arrow>
                            <Button>bottomRight</Button>
                        </Dropdown>
                    </div>
                </div>
                <div
                    id="scrollableDiv"
                    className="users__find-content"
                >
                    <InfiniteScroll
                        dataLength={data.length}
                        next={loadMoreData}
                        hasMore={data.length < 50}
                        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                    >
                        <List
                            dataSource={data}
                            renderItem={item => (
                                <List.Item key={item.email}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.picture.large} />}
                                        title={<a href="https://ant.design">{item.name.last}</a>}
                                        description={item.email}
                                    />
                                    <div>Content</div>
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                </div>
                <div className="users__find-paginator">
                    <Pagination
                        defaultCurrent={1} total={500}
                    />
                </div>
            </div>
        </div>
    );
};

export default Settings;