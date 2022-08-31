import React from 'react';
import Search from "antd/lib/input/Search";
import 'components/Forms/StyledSearch.scss'

type PropsType = {
    onSearch?:(value:string) => void
    handleSetFilter?:(e:React.ChangeEvent<HTMLInputElement>) => void
}
const StyledSearch:React.FC<PropsType> = ({onSearch, handleSetFilter}) => {

    return (
   <>
       {onSearch && <Search placeholder="Поиск по названию, тэгам" allowClear onSearch={onSearch}/>}
       {handleSetFilter && <Search placeholder="Поиск среди контактов" allowClear onChange={handleSetFilter}/>}
   </>
    );
};

export default StyledSearch;