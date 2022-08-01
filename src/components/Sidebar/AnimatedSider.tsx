import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {CustomerServiceOutlined, HomeOutlined, MessageOutlined, TeamOutlined} from "@ant-design/icons";
import {Layout} from 'antd';
import classnames from "classnames";
const {Sider} = Layout

export const AnimatedSider = () => {

    const [isActive, setIsActive] = useState(false)
    const clickHandler = () => {
        setIsActive(!isActive)
    }

    return (
        <>
            <Sider>
                <div className={classnames("site__layout-left-sider", {"left-sider-active": isActive})}>
                    <ul>
                        <li>
                            <NavLink to="/profile"><HomeOutlined /><span>Profile</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/dialogs"><MessageOutlined /><span>Messages</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/music"><CustomerServiceOutlined /><span>My music</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/users"><TeamOutlined /><span>Find friends</span></NavLink>
                        </li>
                    </ul>
                    <div
                        className="toggle"
                        onClick={clickHandler}
                    >
                    </div>
                </div>
            </Sider>
        </>
    );
};

