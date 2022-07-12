import React, {Fragment} from 'react';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { enGB, eo, ru } from 'date-fns/locale'

const locales = {enGB, eo, ru}

const CustomTime: ({date}: { date: Date }) => JSX.Element = ({date}) => {
    let currentDate = formatDistanceToNow(date, {
        addSuffix: true,
        locale: locales.ru
    })
    return <Fragment>
        {currentDate}
    </Fragment>

};

export default CustomTime;