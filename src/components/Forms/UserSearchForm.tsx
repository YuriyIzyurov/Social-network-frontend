import React, {useEffect, useState} from "react";
import {actions, FilterType} from "redux/Reducers/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {getSearchFilter} from "redux/Selectors/user-selectors";
import {Select} from "antd";
import {StyledSearch} from "components/Forms";
import './UserSearchForm.scss'

const { Option } = Select;

export const UserSearchForm = React.memo(({handlingFilteredUsers}:{handlingFilteredUsers: (filter:FilterType) => void}) => {

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
    }

    const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    return (
        <div className="users__find-search">
            <div className="users__find-search-input">
                <StyledSearch defaultValue={filter.term} onSearch={searchUsers} onChange={handleSearchChange} userSearch/>
            </div>
            <div></div>
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




