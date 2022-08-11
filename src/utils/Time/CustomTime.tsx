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
        Онлайн {formatDistanceToNow(parsedDate, {
            addSuffix: true,
            locale: locales.ru
        })}
    </Fragment>
};
export const GetMessageTime:React.FC<{date:string, showFullDate:boolean }> = ({date, showFullDate = false}) => {
    let parsedDate
    if(showFullDate) {
        parsedDate = Date.parse(date)
    } else  parsedDate = Date.parse(date) + 1.08e+7

    if(isToday(parsedDate)) {
        return <Fragment>{format(parsedDate, "Сегодня в HH:mm")}</Fragment>
    } else if(showFullDate){
        return <Fragment>{format(parsedDate, "d.MM.yyyy в HH:mm")}</Fragment>
    } else {
        return <Fragment>{format(parsedDate, "d.MM.yyyy")}</Fragment>
    }
}
