import React from 'react';
import Search from "antd/lib/input/Search";
import 'components/Forms/StyledSearch.scss'

type PropsType = {
    onSearch?:(value:string) => void
    handleSetFilter?:(e:React.ChangeEvent<HTMLInputElement>) => void
    defaultValue?: string
    onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void
    userSearch?: boolean | undefined
}
const StyledSearch:React.FC<PropsType> = ({
                                              onSearch,
                                              handleSetFilter,
                                              defaultValue,
                                              onChange,
                                              userSearch
                                          }) => {

    return (
   <>
       {onSearch && !userSearch && <Search placeholder="Поиск по названию, тэгам" allowClear onSearch={onSearch}/>}
       {handleSetFilter && <Search placeholder="Поиск среди контактов" allowClear onChange={handleSetFilter}/>}
       {onChange && <Search defaultValue={defaultValue} placeholder="Поиск..." allowClear onChange={onChange} onSearch={onSearch  }/>}
   </>
    );
};

export default StyledSearch;