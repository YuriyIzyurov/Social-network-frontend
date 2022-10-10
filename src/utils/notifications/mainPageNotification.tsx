
import {Button, notification} from 'antd';
import React from 'react';
import { NotificationType } from 'typings';

export const mainPageNotification = (type:NotificationType = "info") => {
    const key = `open${Date.now()}`;
    const btn = (
        <Button type="primary" size="small" onClick={() => notification.close(key)}>
            Понятно
        </Button>
);

    notification[type]({
        message: 'Внимание',
        description:
            'Первая загрузка некоторых данных с сервера длится 30 секунд из-за ограничений бесплатного хостинга',
        btn,
        key,
        placement: "top",
        duration: null
    });
};