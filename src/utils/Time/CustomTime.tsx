import React, {Fragment} from 'react';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { enGB, eo, ru } from 'date-fns/locale'
import isToday from "date-fns/isToday";
import {format} from "date-fns";
//для чата, возвращает строковое значение, когда было написано сообщение, н.п. "меньше минуты назад"
const locales = {enGB, eo, ru}

export const CustomTimeDistanceToNow: React.FC<{date:string}> = ({date}) => {
    let parsedDate = Date.parse(date) + + 1.08e+7
    return <Fragment>
        {formatDistanceToNow(parsedDate, {
            addSuffix: true,
            locale: locales.ru
        })}
    </Fragment>
};
export const GetMessageTime:React.FC<{date:string}> = ({date}) => {
    let parsedDate = Date.parse(date) + 1.08e+7
    console.log(parsedDate)
    if(isToday(parsedDate)) {
        return <Fragment>{format(parsedDate, "HH:mm")}</Fragment>
    } else {
        return <Fragment>{format(parsedDate, "d.MM.yyyy")}</Fragment>
    }
}
