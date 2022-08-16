import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import React, {useEffect, useState} from "react";
import {actions, FilterType} from "redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {getSearchFilter} from "redux/user-selectors";
import Search from "antd/lib/input/Search";
import {Button, Dropdown, Menu} from "antd";
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Select } from 'antd';
const { Option } = Select;


type PropsType = {
    handlingFilteredUsers: (filter:FilterType) => void
}
type FormType = {
    term: string
    friend: "null" | "true" | "false"
}
const UserSearchForm: React.FC<PropsType> = React.memo(({handlingFilteredUsers}) => {

    const filter = useSelector(getSearchFilter)
    const initialFriend = filter.friend === null ? "null" : "true"

    const [inputValue, setInputValue] = useState(filter.term)
    const [selectValue, setSelectValue] = useState(initialFriend)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(actions.filterSettings({term: '', friend: null}))
    },[])

    const searchUsers = () => {

        const filter: FilterType = {
            term: inputValue,
            friend: selectValue === "null" ? null : selectValue === "true"
        }
        handlingFilteredUsers(filter)
    }


    const handleChange = (value: string) => {
        setSelectValue(value)
    };

    return (
        <div className="users__find-search">
            <div className="users__find-search-input">
                <Search defaultValue={filter.term} onSearch={searchUsers} onChange={e => setInputValue(e.target.value)} placeholder="Поиск среди контактов" />
            </div>
            <div></div>
            {/*for justify-content: space-between*/}
            <div className="users__find-search-select">
                <Select defaultValue={initialFriend} style={{width: 170}} onChange={handleChange}>
                    <Option value="null">Поиск по всем</Option>
                    <Option value="true">Поиск по друзьям</Option>
                    <Option value="false">Все, кроме друзей</Option>
                </Select>
            </div>
        </div>
    )
})
export default UserSearchForm



