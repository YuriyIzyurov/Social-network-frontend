import React from 'react';
import Search from "antd/lib/input/Search";
import './StyledSearch.scss'

type PropsType = {
    searchPosts?:(value:string) => void
    handleSetFilter?:(e:React.ChangeEvent<HTMLInputElement>) => void
}
const StyledSearch:React.FC<PropsType> = ({searchPosts, handleSetFilter}) => {

    return (
   <>
       {searchPosts && <Search placeholder="Поиск по названию, тэгам" allowClear onSearch={searchPosts}/>}
       {handleSetFilter && <Search placeholder="Поиск среди контактов" allowClear onChange={handleSetFilter}/>}
   </>
    );
};

export default StyledSearch;